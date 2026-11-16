/**
 * WeatherGlassRenderer: Manages WebGL rendering of rain, condensation fog, and frost
 * on the lanyard card.
 *
 * Adapted from Liquid Glass Weather by Codemure (MIT License).
 */

import * as THREE from 'three'
import { CARD, DROPLETS, FOG, FROST, GLASS, NOISE } from './config'
import { DropletSim } from './droplets'
import {
  cardGlassFrag,
  cardGlassVert,
  cardNoiseFrag,
  dropletFrag,
  dropletVert,
  fogMaskFrag,
  fullscreenVert,
} from './shaders'

export type WeatherGlassEffect = 'rain' | 'frost' | 'fog' | 'clear'

export interface WeatherGlassOptions {
  canvas: HTMLCanvasElement
  season?: 'autumn' | 'winter' | 'off'
  effect?: WeatherGlassEffect
}

export class WeatherGlassRenderer {
  readonly canvas: HTMLCanvasElement
  private renderer: THREE.WebGLRenderer
  private sim: DropletSim

  // Targets
  private noiseTarget: THREE.WebGLRenderTarget
  private dropletTarget: THREE.WebGLRenderTarget
  private fogTargetA: THREE.WebGLRenderTarget
  private fogTargetB: THREE.WebGLRenderTarget
  private fogFlip = false
  private noiseBaked = false

  // Passes & Materials
  private noiseMesh: THREE.Mesh
  private noiseScene: THREE.Scene
  private orthCamera: THREE.OrthographicCamera

  private dropletMesh: THREE.Mesh
  private dropletGeom: THREE.InstancedBufferGeometry
  private dropAttr: THREE.InstancedBufferAttribute
  private dirAttr: THREE.InstancedBufferAttribute
  private dropletScene: THREE.Scene

  private fogMesh: THREE.Mesh
  private fogMaterial: THREE.ShaderMaterial
  private fogScene: THREE.Scene

  private glassMesh: THREE.Mesh
  private glassMaterial: THREE.ShaderMaterial
  private glassScene: THREE.Scene

  // State
  private lastBrush = { x: 0, y: 0, valid: false }
  private currentPointer = { x: 0, y: 0, active: false }
  private tilt = new THREE.Vector2(0, 0)
  private time = 0
  private season: 'autumn' | 'winter' = 'autumn'
  private effect: WeatherGlassEffect = 'rain'
  private disposed = false

  constructor(options: WeatherGlassOptions) {
    this.canvas = options.canvas
    this.season = options.season === 'winter' ? 'winter' : 'autumn'
    this.effect = options.effect || (this.season === 'winter' ? 'frost' : 'rain')

    const gl = options.canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    })

    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      context: gl || undefined,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    })
    this.renderer.setClearColor(0x000000, 0)

    const halfW = CARD.width / 2
    const halfH = CARD.height / 2
    this.sim = new DropletSim(halfW, halfH, DROPLETS.capacity)
    this.applyEffectParams()

    this.orthCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Render Targets
    const mapW = Math.round((DROPLETS.mapHeight * CARD.width) / CARD.height)
    const mapH = DROPLETS.mapHeight

    this.noiseTarget = new THREE.WebGLRenderTarget(mapW, NOISE.mapHeight, {
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })

    this.dropletTarget = new THREE.WebGLRenderTarget(mapW, mapH, {
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })

    const fogW = Math.round((FOG.mapHeight * CARD.width) / CARD.height)
    this.fogTargetA = new THREE.WebGLRenderTarget(fogW, FOG.mapHeight, {
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })
    this.fogTargetB = new THREE.WebGLRenderTarget(fogW, FOG.mapHeight, {
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })

    const quadGeom = new THREE.PlaneGeometry(2, 2)

    // 1. Noise Pass
    const noiseMat = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: cardNoiseFrag,
      uniforms: {
        uHalfSize: { value: new THREE.Vector2(halfW, halfH) },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.noiseMesh = new THREE.Mesh(quadGeom, noiseMat)
    this.noiseScene = new THREE.Scene()
    this.noiseScene.add(this.noiseMesh)

    // 2. Droplets Pass
    this.dropletGeom = new THREE.InstancedBufferGeometry()
    this.dropletGeom.index = quadGeom.index
    this.dropletGeom.setAttribute('position', quadGeom.getAttribute('position'))
    this.dropAttr = new THREE.InstancedBufferAttribute(new Float32Array(this.sim.capacity * 4), 4)
    this.dirAttr = new THREE.InstancedBufferAttribute(new Float32Array(this.sim.capacity * 2), 2)
    this.dropAttr.setUsage(THREE.DynamicDrawUsage)
    this.dirAttr.setUsage(THREE.DynamicDrawUsage)
    this.dropletGeom.setAttribute('aDrop', this.dropAttr)
    this.dropletGeom.setAttribute('aDir', this.dirAttr)
    this.dropletGeom.instanceCount = 0

    const dropletMat = new THREE.ShaderMaterial({
      vertexShader: dropletVert,
      fragmentShader: dropletFrag,
      uniforms: {
        uHalfSize: { value: new THREE.Vector2(halfW, halfH) },
        uKernelScale: { value: DROPLETS.kernelScale },
        uHeightScale: { value: DROPLETS.heightScale },
      },
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })
    this.dropletMesh = new THREE.Mesh(this.dropletGeom, dropletMat)
    this.dropletMesh.frustumCulled = false
    this.dropletScene = new THREE.Scene()
    this.dropletScene.add(this.dropletMesh)

    // 3. Fog Wipe Pass
    this.fogMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: fogMaskFrag,
      uniforms: {
        uPrev: { value: null },
        uDrops: { value: this.dropletTarget.texture },
        uNoise: { value: this.noiseTarget.texture },
        uHalfSize: { value: new THREE.Vector2(halfW, halfH) },
        uDecay: { value: 0 },
        uBrushA: { value: new THREE.Vector2() },
        uBrushB: { value: new THREE.Vector2() },
        uBrushRadius: { value: FOG.brushRadius },
        uBrushStrength: { value: 0 },
        uDropThreshold: { value: DROPLETS.threshold },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.fogMesh = new THREE.Mesh(quadGeom, this.fogMaterial)
    this.fogScene = new THREE.Scene()
    this.fogScene.add(this.fogMesh)

    // 4. Main Glass Overlay Pass
    this.glassMaterial = new THREE.ShaderMaterial({
      vertexShader: cardGlassVert,
      fragmentShader: cardGlassFrag,
      uniforms: {
        uResolution: { value: new THREE.Vector2(this.canvas.width, this.canvas.height) },
        uHalfSize: { value: new THREE.Vector2(halfW, halfH) },
        uRadius: { value: CARD.radius },
        uBevel: { value: CARD.bevel },
        uTilt: { value: this.tilt },
        uLightPos: { value: new THREE.Vector3(...GLASS.lightPos) },
        uTime: { value: 0 },
        uDrops: { value: this.dropletTarget.texture },
        uDropThreshold: { value: DROPLETS.threshold },
        uDropHeightScale: { value: DROPLETS.heightScale },
        uNoise: { value: this.noiseTarget.texture },
        uWipe: { value: null },
        uFog: { value: 0.35 },
        uFrost: { value: 0.0 },
        uFrostReach: { value: FROST.reach },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    const cardPlane = new THREE.PlaneGeometry(CARD.width, CARD.height)
    this.glassMesh = new THREE.Mesh(cardPlane, this.glassMaterial)
    this.glassScene = new THREE.Scene()
    this.glassScene.add(this.glassMesh)

    this.applyEffectParams()
    this.resize()
  }

  setEffect(effect: WeatherGlassEffect) {
    this.effect = effect
    this.applyEffectParams()
  }

  setSeason(season: 'autumn' | 'winter' | 'off') {
    if (season === 'off') return
    this.season = season
    // If user hasn't explicitly set fog or clear, align with season
    if (this.effect === 'rain' || this.effect === 'frost') {
      this.effect = season === 'winter' ? 'frost' : 'rain'
      this.applyEffectParams()
    }
  }

  private applyEffectParams() {
    if (!this.glassMaterial) return
    switch (this.effect) {
      case 'rain':
        this.sim.rain = 0.85
        this.sim.frost = 0.0
        this.glassMaterial.uniforms.uFog.value = 0.35
        this.glassMaterial.uniforms.uFrost.value = 0.0
        break
      case 'frost':
        this.sim.rain = 0.02
        this.sim.frost = 0.95
        this.glassMaterial.uniforms.uFog.value = 0.05
        this.glassMaterial.uniforms.uFrost.value = 0.95
        break
      case 'fog':
        this.sim.rain = 0.0
        this.sim.frost = 0.0
        this.sim.clear()
        this.glassMaterial.uniforms.uFog.value = 0.85
        this.glassMaterial.uniforms.uFrost.value = 0.0
        break
      case 'clear':
        this.sim.rain = 0.0
        this.sim.frost = 0.0
        this.sim.clear()
        this.glassMaterial.uniforms.uFog.value = 0.0
        this.glassMaterial.uniforms.uFrost.value = 0.0
        break
    }
  }

  setMotion(angle: number, vx: number, vy: number) {
    this.tilt.set(angle, -vx * 0.02)
    // Dynamic gravity responding to swinging lanyard card
    const swingForce = Math.hypot(vx, vy) * 0.04
    this.sim.gravity.x = -Math.sin(angle) * (1 + swingForce) - vx * 0.02
    this.sim.gravity.y = -Math.cos(angle) * (1 + swingForce) + vy * 0.02
  }

  setPointer(normX: number, normY: number, active: boolean) {
    const halfW = CARD.width / 2
    const halfH = CARD.height / 2
    this.currentPointer.x = (normX - 0.5) * 2.0 * halfW
    this.currentPointer.y = (0.5 - normY) * 2.0 * halfH
    this.currentPointer.active = active
  }

  resize() {
    if (this.disposed) return
    const rect = this.canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(rect.width * dpr))
    const h = Math.max(1, Math.round(rect.height * dpr))

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
      this.renderer.setSize(rect.width, rect.height, false)
      this.glassMaterial.uniforms.uResolution.value.set(w, h)
    }
  }

  updateAndRender(dt: number) {
    if (this.disposed) return
    this.time += dt

    // 1. Bake noise once
    if (!this.noiseBaked) {
      this.renderer.setRenderTarget(this.noiseTarget)
      this.renderer.render(this.noiseScene, this.orthCamera)
      this.noiseBaked = true
    }

    // 2. Step Droplet Simulation
    this.sim.step(dt)
    const count = this.sim.writeInstances(
      this.dropAttr.array as Float32Array,
      this.dirAttr.array as Float32Array
    )
    this.dropletGeom.instanceCount = count
    this.dropAttr.needsUpdate = true
    this.dirAttr.needsUpdate = true

    // Render Droplet Map
    this.renderer.setRenderTarget(this.dropletTarget)
    this.renderer.clearColor()
    this.renderer.render(this.dropletScene, this.orthCamera)

    // 3. Update Fog Wipe Ping-Pong
    const readTarget = this.fogFlip ? this.fogTargetB : this.fogTargetA
    const writeTarget = this.fogFlip ? this.fogTargetA : this.fogTargetB
    const uFog = this.fogMaterial.uniforms

    uFog.uPrev.value = readTarget.texture
    uFog.uDecay.value = dt / FOG.regrowSeconds

    const wiping = this.currentPointer.active
    uFog.uBrushStrength.value = wiping ? 1 : 0
    if (wiping) {
      const from = this.lastBrush.valid ? this.lastBrush : this.currentPointer
      uFog.uBrushA.value.set(from.x, from.y)
      uFog.uBrushB.value.set(this.currentPointer.x, this.currentPointer.y)
    }
    this.lastBrush.x = this.currentPointer.x
    this.lastBrush.y = this.currentPointer.y
    this.lastBrush.valid = wiping

    this.renderer.setRenderTarget(writeTarget)
    this.renderer.render(this.fogScene, this.orthCamera)
    this.fogFlip = !this.fogFlip

    // 4. Render Main Glass Overlay
    const uGlass = this.glassMaterial.uniforms
    uGlass.uTime.value = this.time
    uGlass.uWipe.value = writeTarget.texture

    this.renderer.setRenderTarget(null)
    this.renderer.render(this.glassScene, this.orthCamera)
  }

  dispose() {
    this.disposed = true
    this.noiseTarget.dispose()
    this.dropletTarget.dispose()
    this.fogTargetA.dispose()
    this.fogTargetB.dispose()
    this.dropletGeom.dispose()
    this.renderer.dispose()
  }
}

