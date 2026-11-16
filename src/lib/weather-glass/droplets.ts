/**
 * Rain-on-glass droplet simulation in card-local units (origin at card center, +y up).
 * Adapted from Liquid Glass Weather by Codemure (MIT License).
 * Struct-of-arrays storage so a frame allocates nothing.
 */

const R_MIN = 0.012
const R_MAX = 0.06
/** Radius below which a drop dies (evaporated). */
const R_DEAD = 0.004
/** Static friction threshold: a drop slides once radius * |gravity| exceeds this. */
const R_STICK = 0.058
const SPEED_K = 60
const MAX_SPEED = 2.5
const ACCEL = 6
const BRAKE = 14
/** Spawns per second at rain = 1. */
const SPAWN_RATE = 40
const GROW_TIME = 0.12
/** Radius lost per second when it isn't raining. */
const EVAPORATION = 0.002
/** Distance traveled (in multiples of radius) between trail droplets. */
const TRAIL_SPACING = 2.2
const TRAIL_MASS_LOSS = 0.35
const TRAIL_LIFE: [number, number] = [1, 2.5]
const TRAIL_FADE = 0.8
/** Wind is added to gravity, so a strong side wind slants every run. */
const WIND_K = 1.2
/** Frost multiplies static friction by up to 1 + this, freezing drops in place. */
const FROZEN_FRICTION = 8

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export class DropletSim {
  readonly capacity: number
  readonly halfW: number
  readonly halfH: number
  count = 0

  /** 0..1 */
  rain = 0
  /** 0..1. Frozen drops stick and stop evaporating. */
  frost = 0
  /** 0..1. Heat evaporates drops faster. */
  heat = 0
  /** Card-space gravity. Length ~1 when the card is flat; grows with tilt/swing. */
  readonly gravity = { x: 0, y: -1 }
  readonly wind = { x: 0, y: 0 }

  readonly x: Float32Array
  readonly y: Float32Array
  readonly r: Float32Array
  readonly vx: Float32Array
  readonly vy: Float32Array
  readonly grow: Float32Array
  /** Remaining life in seconds; only meaningful when lifeMax > 0 (trail drops). */
  readonly life: Float32Array
  readonly lifeMax: Float32Array
  readonly seed: Float32Array
  readonly trailDist: Float32Array
  readonly id: Int32Array
  /** Id of the drop that left this one as a trail, so it doesn't re-absorb its own trail. */
  readonly parent: Int32Array

  private time = 0
  private spawnAcc = 0
  private nextId = 1

  constructor(halfW: number, halfH: number, capacity = 250) {
    this.halfW = halfW
    this.halfH = halfH
    this.capacity = capacity
    this.x = new Float32Array(capacity)
    this.y = new Float32Array(capacity)
    this.r = new Float32Array(capacity)
    this.vx = new Float32Array(capacity)
    this.vy = new Float32Array(capacity)
    this.grow = new Float32Array(capacity)
    this.life = new Float32Array(capacity)
    this.lifeMax = new Float32Array(capacity)
    this.seed = new Float32Array(capacity)
    this.trailDist = new Float32Array(capacity)
    this.id = new Int32Array(capacity)
    this.parent = new Int32Array(capacity)
  }

  step(dt: number) {
    this.time += dt
    this.spawn(dt)
    this.integrate(dt)
    this.absorb()
    this.compact()
  }

  clear() {
    this.count = 0
  }

  /**
   * Writes per-instance render data: (x, y, visible radius, stretch) and the unit motion direction.
   * Returns the instance count.
   */
  writeInstances(drops: Float32Array, dirs: Float32Array): number {
    for (let i = 0; i < this.count; i++) {
      const g = 1 - Math.pow(1 - this.grow[i], 3)
      const fade = this.lifeMax[i] > 0 ? Math.min(1, this.life[i] / TRAIL_FADE) : 1
      const speed = Math.hypot(this.vx[i], this.vy[i])
      drops[i * 4] = this.x[i]
      drops[i * 4 + 1] = this.y[i]
      drops[i * 4 + 2] = this.r[i] * g * fade
      drops[i * 4 + 3] = 1 + Math.min(0.45, speed * 0.25)
      if (speed > 1e-4) {
        dirs[i * 2] = this.vx[i] / speed
        dirs[i * 2 + 1] = this.vy[i] / speed
      } else {
        dirs[i * 2] = 0
        dirs[i * 2 + 1] = 1
      }
    }
    return this.count
  }

  private add(x: number, y: number, r: number, lifeMax: number, parent: number, grow: number): number {
    const i = this.count++
    this.x[i] = x
    this.y[i] = y
    this.r[i] = r
    this.vx[i] = 0
    this.vy[i] = 0
    this.grow[i] = grow
    this.life[i] = lifeMax
    this.lifeMax[i] = lifeMax
    this.seed[i] = Math.random()
    this.trailDist[i] = 0
    this.id[i] = this.nextId++
    this.parent[i] = parent
    return i
  }

  private spawn(dt: number) {
    this.spawnAcc += dt * SPAWN_RATE * Math.pow(this.rain, 1.5)
    while (this.spawnAcc >= 1) {
      this.spawnAcc -= 1
      this.spawnOne()
    }
  }

  private spawnOne() {
    const r = (R_MIN + (R_MAX - R_MIN) * Math.pow(Math.random(), 3)) * (0.75 + 0.5 * this.rain)
    const x = rand(-this.halfW, this.halfW)
    const y = rand(-this.halfH, this.halfH)

    for (let j = 0; j < this.count; j++) {
      const rj = this.r[j]
      if (rj <= 0) continue
      const dx = x - this.x[j]
      const dy = y - this.y[j]
      if (dx * dx + dy * dy < (r + rj) * (r + rj)) {
        this.mergeInto(j, x, y, r)
        this.lifeMax[j] = 0
        return
      }
    }

    if (this.count >= this.capacity && !this.recycleTrail()) return
    this.add(x, y, r, 0, 0, 0)
  }

  private recycleTrail(): boolean {
    let best = -1
    for (let i = 0; i < this.count; i++) {
      if (this.lifeMax[i] > 0 && (best < 0 || this.life[i] < this.life[best])) best = i
    }
    if (best < 0) return false
    this.r[best] = 0
    this.compact()
    return true
  }

  private mergeInto(i: number, x: number, y: number, r: number) {
    const ai = this.r[i] * this.r[i]
    const aj = r * r
    const w = aj / (ai + aj)
    this.x[i] += (x - this.x[i]) * w * 0.5
    this.y[i] += (y - this.y[i]) * w * 0.5
    this.r[i] = Math.sqrt(ai + aj)
    this.vx[i] *= 1 - w
    this.vy[i] *= 1 - w
  }

  private integrate(dt: number) {
    const gx = this.gravity.x + this.wind.x * WIND_K
    const gy = this.gravity.y + this.wind.y * WIND_K
    const gLen = Math.max(Math.hypot(gx, gy), 1e-6)
    const gdx = gx / gLen
    const gdy = gy / gLen
    const evap = EVAPORATION * (1.15 - this.rain) * (1 + this.heat * 3) * (1 - this.frost) * dt
    const t = this.time
    const n = this.count

    for (let i = 0; i < n; i++) {
      if (this.r[i] <= 0) continue
      this.grow[i] = Math.min(1, this.grow[i] + dt / GROW_TIME)

      const isTrail = this.lifeMax[i] > 0
      if (isTrail) {
        this.life[i] -= dt
        if (this.life[i] <= 0) {
          this.r[i] = 0
          continue
        }
      } else {
        this.r[i] -= evap
        if (this.r[i] < R_DEAD) {
          this.r[i] = 0
          continue
        }
      }

      const s = this.seed[i]
      const friction = 0.7 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3.1 + s * 17) * Math.sin(t * 1.3 + s * 5))
      const excess = this.r[i] * gLen - R_STICK * friction * (1 + this.frost * FROZEN_FRICTION)

      let tvx = 0
      let tvy = 0
      if (excess > 0 && !isTrail) {
        const speed = Math.min(MAX_SPEED, excess * SPEED_K)
        const wobble = 0.35 * Math.sin(t * 2.3 + s * 10) * Math.sin(t * 0.7 + s * 3)
        let dx = gdx - gdy * wobble
        let dy = gdy + gdx * wobble
        const l = Math.hypot(dx, dy) || 1
        dx /= l
        dy /= l
        tvx = dx * speed
        tvy = dy * speed
      }

      const k = Math.min(1, dt * (excess > 0 ? ACCEL : BRAKE))
      this.vx[i] += (tvx - this.vx[i]) * k
      this.vy[i] += (tvy - this.vy[i]) * k
      this.x[i] += this.vx[i] * dt
      this.y[i] += this.vy[i] * dt

      const speed = Math.hypot(this.vx[i], this.vy[i])
      if (speed > 0.02) {
        this.trailDist[i] += speed * dt
        if (this.trailDist[i] > this.r[i] * TRAIL_SPACING) {
          this.trailDist[i] = 0
          this.leaveTrail(i, speed)
        }
      }

      const r = this.r[i]
      if (Math.abs(this.x[i]) > this.halfW + r || Math.abs(this.y[i]) > this.halfH + r) this.r[i] = 0
    }
  }

  private leaveTrail(i: number, speed: number) {
    if (this.count >= this.capacity) return
    const r = this.r[i]
    const rt = r * rand(0.16, 0.32)
    const dx = this.vx[i] / speed
    const dy = this.vy[i] / speed
    const side = rand(-0.25, 0.25) * r
    this.add(
      this.x[i] - dx * r * 0.8 - dy * side,
      this.y[i] - dy * r * 0.8 + dx * side,
      rt,
      rand(TRAIL_LIFE[0], TRAIL_LIFE[1]),
      this.id[i],
      1,
    )
    this.r[i] = Math.sqrt(Math.max(r * r - rt * rt * TRAIL_MASS_LOSS, 0))
  }

  private absorb() {
    const n = this.count
    for (let i = 0; i < n; i++) {
      if (this.r[i] <= 0 || this.lifeMax[i] > 0) continue
      if (this.vx[i] * this.vx[i] + this.vy[i] * this.vy[i] < 1e-4) continue
      for (let j = 0; j < n; j++) {
        if (j === i || this.r[j] <= 0 || this.parent[j] === this.id[i]) continue
        const dx = this.x[j] - this.x[i]
        const dy = this.y[j] - this.y[i]
        const reach = this.r[i] + this.r[j] * 0.8
        if (dx * dx + dy * dy < reach * reach) {
          this.mergeInto(i, this.x[j], this.y[j], this.r[j])
          this.r[j] = 0
        }
      }
    }
  }

  private compact() {
    let w = 0
    for (let i = 0; i < this.count; i++) {
      if (this.r[i] <= 0) continue
      if (w !== i) {
        this.x[w] = this.x[i]
        this.y[w] = this.y[i]
        this.r[w] = this.r[i]
        this.vx[w] = this.vx[i]
        this.vy[w] = this.vy[i]
        this.grow[w] = this.grow[i]
        this.life[w] = this.life[i]
        this.lifeMax[w] = this.lifeMax[i]
        this.seed[w] = this.seed[i]
        this.trailDist[w] = this.trailDist[i]
        this.id[w] = this.id[i]
        this.parent[w] = this.parent[i]
      }
      w++
    }
    this.count = w
  }
}

