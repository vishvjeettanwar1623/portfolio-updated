/**
 * Shader sources for the Liquid Weather Glass card overlay.
 * Adapted from Liquid Glass Weather by Codemure (MIT License).
 */

export const fullscreenVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const noiseGlsl = /* glsl */ `
vec3 permute289(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute289(permute289(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * snoise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    amp *= 0.5;
  }
  return sum * 0.5 + 0.5;
}

float ridged(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float prev = 1.0;
  for (int i = 0; i < 5; i++) {
    float n = 1.0 - abs(snoise(p));
    n *= n;
    sum += n * amp * prev;
    prev = n;
    p = mat2(1.7, 1.1, -1.1, 1.7) * p;
    amp *= 0.5;
  }
  return sum;
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`;

export const sdfGlsl = /* glsl */ `
float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec2 sdRoundRectGrad(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  vec2 g;
  if (q.x > 0.0 || q.y > 0.0) {
    vec2 m = max(q, 0.0);
    g = m / max(length(m), 1e-5);
  } else {
    g = q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  }
  return g * sign(p + 1e-6);
}
`;

export const cardNoiseFrag = /* glsl */ `
${noiseGlsl}
uniform vec2 uHalfSize;
varying vec2 vUv;

void main() {
  vec2 p = (vUv - 0.5) * 2.0 * uHalfSize;
  vec2 warp = vec2(fbm(p * 2.2 + 3.1), fbm(p * 2.2 - 7.4)) - 0.5;
  // Crisp branching ice veins
  float branches = ridged(p * 3.5 + warp * 3.0);
  // Crystalline needle / feather streaks
  float featherX = ridged(vec2(p.x * 4.0, p.y * 18.0) + warp * 3.5);
  float featherY = ridged(vec2(p.x * 18.0, p.y * 4.0) + warp * 3.5 + 19.0);
  float low = fbm(p * 1.4 + 11.0);
  gl_FragColor = clamp(vec4(branches, featherX, low, featherY), 0.0, 1.0);
}
`;

export const fogMaskFrag = /* glsl */ `
${noiseGlsl}
uniform sampler2D uPrev;
uniform sampler2D uDrops;
uniform sampler2D uNoise;
uniform vec2 uHalfSize;
uniform float uDecay;
uniform vec2 uBrushA;
uniform vec2 uBrushB;
uniform float uBrushRadius;
uniform float uBrushStrength;
uniform float uDropThreshold;

varying vec2 vUv;

void main() {
  vec2 p = (vUv - 0.5) * 2.0 * uHalfSize;
  float m = max(texture2D(uPrev, vUv).r - uDecay, 0.0);

  if (uBrushStrength > 0.0) {
    vec2 pa = p - uBrushA;
    vec2 ba = uBrushB - uBrushA;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    float dist = length(pa - ba * h);
    vec4 n = texture2D(uNoise, vUv);
    dist += (n.b - 0.5) * uBrushRadius * 0.5 + (n.g - 0.5) * uBrushRadius * 0.25;
    float brush = 1.0 - smoothstep(uBrushRadius * 0.45, uBrushRadius, dist);
    vec2 dir = dot(ba, ba) > 1e-8 ? normalize(ba) : vec2(1.0, 0.0);
    float across = dot(pa, vec2(-dir.y, dir.x));
    float along = dot(pa, dir);
    brush *= 0.72 + 0.28 * snoise(vec2(across * 55.0, along * 2.5));
    m = max(m, brush * uBrushStrength);
  }

  float drop = smoothstep(uDropThreshold * 0.6, uDropThreshold + 0.1, texture2D(uDrops, vUv).r);
  m = max(m, drop * 0.85);

  gl_FragColor = vec4(m, 0.0, 0.0, 1.0);
}
`;

export const dropletVert = /* glsl */ `
attribute vec4 aDrop;
attribute vec2 aDir;
uniform vec2 uHalfSize;
uniform float uKernelScale;
varying vec2 vLocal;
varying float vRadius;

void main() {
  vLocal = position.xy;
  vRadius = aDrop.z;
  float rk = aDrop.z * uKernelScale;
  float s = aDrop.w;
  vec2 perp = vec2(aDir.y, -aDir.x);
  vec2 offset = (aDir * position.y * s + perp * position.x / sqrt(s)) * rk;
  gl_Position = vec4((aDrop.xy + offset) / uHalfSize, 0.0, 1.0);
}
`;

export const dropletFrag = /* glsl */ `
uniform float uHeightScale;
varying vec2 vLocal;
varying float vRadius;

void main() {
  float q2 = dot(vLocal, vLocal);
  if (q2 >= 1.0) discard;
  float f = 1.0 - q2;
  f *= f;
  gl_FragColor = vec4(f, f * vRadius * uHeightScale, 0.0, 0.0);
}
`;

export const cardGlassVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vViewPos;
varying vec3 vViewNormal;
varying vec3 vViewTangent;
varying vec3 vViewBitangent;

void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  vViewNormal = normalize(normalMatrix * normal);
  vViewTangent = normalize(normalMatrix * vec3(1.0, 0.0, 0.0));
  vViewBitangent = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}
`;

export const cardGlassFrag = /* glsl */ `
${sdfGlsl}
${noiseGlsl}

uniform vec2 uResolution;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uBevel;
uniform vec2 uTilt;
uniform vec3 uLightPos;
uniform float uTime;

uniform sampler2D uDrops;
uniform float uDropThreshold;
uniform float uDropHeightScale;

uniform sampler2D uNoise;
uniform sampler2D uWipe;
uniform float uFog;
uniform float uFrost;
uniform float uFrostReach;

varying vec2 vUv;
varying vec3 vViewPos;
varying vec3 vViewNormal;
varying vec3 vViewTangent;
varying vec3 vViewBitangent;

const vec3 ICE = vec3(0.86, 0.93, 1.0);
const vec3 FOG_COL = vec3(0.92, 0.94, 0.97);

void main() {
  vec2 p = (vUv - 0.5) * 2.0 * uHalfSize;
  float d = sdRoundRect(p, uHalfSize, uRadius);
  float aa = max(fwidth(d), 1e-5);
  float mask = clamp(0.5 - d / aa, 0.0, 1.0);

  if (mask <= 0.0) {
    discard;
  }

  vec2 mapUv = vUv;
  float F = texture2D(uDrops, mapUv).r;
  float fw = max(fwidth(F), 1e-4);

  vec4 nz = texture2D(uNoise, mapUv);
  vec2 n2 = sdRoundRectGrad(p, uHalfSize, uRadius);
  float edge = clamp(1.0 + d / uBevel, 0.0, 1.0);
  float bend = edge * edge * edge;

  // Fog & condensation
  float wipe = texture2D(uWipe, mapUv).r;
  float wiped = smoothstep(0.08, 0.55, wipe + (nz.b - 0.5) * 0.25);
  float fog = clamp(uFog * (0.8 + 0.4 * nz.b) * (1.0 - wiped), 0.0, 1.0);

  // Frost
  float frost = 0.0;
  float frostFront = 0.0;
  float feather = 0.0;
  float frostPattern = 0.0;
  float glint = 0.0;
  if (uFrost > 0.001) {
    vec2 axes = clamp(1.0 - abs(p) / uHalfSize, 0.0, 1.0);
    feather = mix(nz.g, nz.a, smoothstep(0.3, 0.7, abs(n2.y)));

    // Penetrates inward especially from corners and borders
    float cornerBoost = (1.0 - sqrt(axes.x * axes.y)) * 0.40;
    float depth = -d / uHalfSize.x;

    // Intricate crystal dendrite branching
    float branchNoise = (nz.r - 0.42) * 0.70 + (feather - 0.38) * 0.35;
    float reach = uFrost * 0.85 + cornerBoost + branchNoise - depth * 0.72;

    frost = smoothstep(0.0, 0.10, reach);
    frostFront = smoothstep(0.0, 0.03, reach) * (1.0 - smoothstep(0.03, 0.14, reach));

    float crystalNeedles = pow(feather, 2.5) * 0.75;
    float crystalVeins = pow(nz.r, 2.0) * 0.65;
    frostPattern = crystalNeedles + crystalVeins + frostFront * 0.45;

    // Star-like glistening ice sparkles that twinkle with lanyard motion
    vec2 cellP = p * 60.0;
    float h = hash12(floor(cellP));
    float twinkle = sin(h * 150.0 + uTilt.x * 65.0 - uTilt.y * 55.0 + uTime * 1.5);
    vec2 cellFrac = fract(cellP) - 0.5;
    float star = max(1.0 - abs(cellFrac.x) * 4.0, 0.0) * max(1.0 - abs(cellFrac.y) * 4.0, 0.0);
    float dotShape = max(1.0 - length(cellFrac) * 2.8, 0.0) + star * 0.8;
    glint = 1.35 * step(0.86, h) * smoothstep(0.72, 1.0, twinkle) * dotShape * frost;
  }

  // Base glass sheen
  float sheen = 0.035 * (1.0 - smoothstep(-0.6, 1.4, (p.x / uHalfSize.x) * 0.5 - (p.y / uHalfSize.y)));

  // View & light directions
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uLightPos - vViewPos);
  vec3 H = normalize(L + V);
  vec2 l2 = normalize(vec2(-1.0, 1.0) + vec2(-uTilt.y, uTilt.x) * 4.0);

  // Start with fog layer (soft velvety cloudy condensation)
  vec3 col = FOG_COL;
  float speckle = (hash12(floor(p * 280.0)) - 0.5) * 0.04 * fog;
  col += speckle;
  float alpha = fog * 0.55;

  // Frost crystallization (sharp, crystalline ice with branching veins & glistening stars)
  if (frost > 0.0) {
    vec3 frostCol = mix(ICE, vec3(1.0, 1.0, 1.0), clamp(frostPattern, 0.0, 1.0));
    frostCol += vec3(glint);

    col = mix(col, frostCol, frost * 0.92);
    float frostAlpha = frost * 0.70 + frostPattern * 0.22 + glint * 0.6;
    alpha = max(alpha, frostAlpha);
  }

  // Droplets layer
  if (F > uDropThreshold - fw) {
    float dropMask = smoothstep(uDropThreshold - fw, uDropThreshold + fw, F);
    vec2 e = 1.0 / vec2(textureSize(uDrops, 0));
    vec2 grad = vec2(
      texture2D(uDrops, mapUv + vec2(e.x, 0.0)).g - texture2D(uDrops, mapUv - vec2(e.x, 0.0)).g,
      texture2D(uDrops, mapUv + vec2(0.0, e.y)).g - texture2D(uDrops, mapUv - vec2(0.0, e.y)).g
    ) / (uDropHeightScale * 4.0 * e * uHalfSize);

    vec3 dropColor = vec3(0.96, 0.98, 1.0);
    dropColor = mix(dropColor, ICE * 0.95, frost * 0.5);

    float border = 1.0 - smoothstep(uDropThreshold, uDropThreshold + 0.12, F);
    vec3 dropEdge = vec3(0.08, 0.12, 0.18) * (1.0 - frost * 0.4);

    float glen = length(grad);
    vec2 gdir = grad / max(glen, 1e-4);
    float inner = 1.0 - smoothstep(uDropThreshold + 0.05, uDropThreshold + 0.4, F);
    float caustic = 0.28 * inner * (1.0 - border) * pow(max(dot(gdir, l2), 0.0), 2.0);

    vec3 dn = normalize(vViewNormal - (vViewTangent * grad.x + vViewBitangent * grad.y) * 2.0);
    vec3 dH = normalize(H + (vViewTangent * l2.x + vViewBitangent * l2.y) * 0.45);
    float dndh = max(dot(dn, dH), 0.0);
    float dropSpec = pow(dndh, 140.0) * 0.95 + pow(dndh, 14.0) * 0.08;

    vec3 dc = mix(dropColor, dropEdge, border * 0.6) + caustic + dropSpec;
    float dropAlpha = (border * 0.45 + caustic * 0.8 + dropSpec + 0.15) * dropMask;

    col = mix(col, dc, dropMask);
    alpha = mix(alpha, max(alpha * 0.15, dropAlpha), dropMask);
  }

  // Bevel & glass lighting
  vec3 N = normalize(vViewNormal + (vViewTangent * n2.x + vViewBitangent * n2.y) * bend * 1.6);
  float ndh = max(dot(N, H), 0.0);
  float broadSpec = pow(ndh, 24.0) * 0.08;
  float sharpSpec = pow(ndh, 260.0) * 0.50 * bend;
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 4.0) * 0.15;
  float facing = dot(n2, l2);
  float rimBand = smoothstep(-2.0 * aa, 0.0, d);
  float rim = rimBand * (0.15 + 0.55 * pow(max(facing, 0.0), 2.0) + 0.22 * pow(max(-facing, 0.0), 2.0));

  col += vec3(sheen + broadSpec + sharpSpec + fresnel + rim);
  alpha += (sheen * 0.4 + broadSpec * 0.8 + sharpSpec + rim * 0.7);

  alpha = clamp(alpha * mask, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

