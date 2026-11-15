/**
 * Liquid Weather Glass configuration.
 * Adapted from Liquid Glass Weather by Codemure (MIT License).
 */

export const CARD = {
  width: 2.0,
  height: 3.9,
  radius: 0.16,
  bevel: 0.05,
}

export const GLASS = {
  refractPx: 22,
  blurLod: 3.2,
  lightPos: [-2.2, 2.8, -1.0] as const,
}

export const DROPLETS = {
  capacity: 250,
  mapHeight: 512,
  threshold: 0.25,
  kernelScale: Math.SQRT2,
  heightScale: 12,
  lens: 0.09,
  tiltGravity: 2.5 / ((15 * Math.PI) / 180),
}

export const NOISE = {
  mapHeight: 512,
}

export const FOG = {
  mapHeight: 384,
  brushRadius: 0.28,
  regrowSeconds: 7,
}

export const FROST = {
  reach: 0.55,
}

