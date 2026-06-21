/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useEffect } from 'react'

/**
 * Canvas animation hooks for the landing page (speed field, breathing mesh,
 * telemetry oscilloscope). Each one:
 *  - scales for devicePixelRatio (capped at 2),
 *  - only paints while the canvas is on screen (saves battery),
 *  - cleans up its rAF + resize listener on unmount (StrictMode-safe).
 *
 * They draw the actual visuals — unlike the prototype's reveal hack, rAF here
 * is the legitimate render loop, not a workaround.
 */

type CanvasRef = React.RefObject<HTMLCanvasElement | null>

type Dim = { w: number; h: number }

function fitCanvas(cv: HTMLCanvasElement, dpr: number): Dim {
  const rect = cv.getBoundingClientRect()
  cv.width = Math.max(1, Math.floor(rect.width * dpr))
  cv.height = Math.max(1, Math.floor(rect.height * dpr))
  return { w: rect.width, h: rect.height }
}

function isOnScreen(cv: HTMLCanvasElement, margin = 0): boolean {
  const rect = cv.getBoundingClientRect()
  return rect.bottom > -margin && rect.top < window.innerHeight + margin
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Screen 02 — horizontal speed streaks with motion trails and a hint of lime. */
export function useSpeedField(ref: CanvasRef) {
  useEffect(() => {
    const cv = ref.current
    if (!cv || prefersReducedMotion()) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let dim = fitCanvas(cv, dpr)
    let raf = 0

    const make = () => {
      const accent = Math.random() < 0.08
      return {
        x: dim.w + Math.random() * dim.w,
        y: Math.random() * dim.h,
        len: 80 + Math.random() * 320,
        v: 6 + Math.random() * 26,
        w: accent ? 0.8 + Math.random() * 1.2 : 0.4 + Math.random() * 1.1,
        a: 0.04 + Math.random() * 0.5,
        accent,
      }
    }
    let streaks = Array.from({ length: 130 }, make)

    const loop = () => {
      if (isOnScreen(cv, 120)) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = 'rgba(6,7,10,0.32)'
        ctx.fillRect(0, 0, dim.w, dim.h)
        ctx.globalCompositeOperation = 'lighter'
        for (const s of streaks) {
          s.x -= s.v
          ctx.strokeStyle = s.accent
            ? `rgba(205,255,78,${s.a})`
            : `rgba(186,206,242,${s.a * 0.55})`
          ctx.lineWidth = s.w
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x + s.len, s.y)
          ctx.stroke()
          if (s.x + s.len < -20) {
            Object.assign(s, make(), { x: dim.w + Math.random() * 120 })
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      dim = fitCanvas(cv, dpr)
      streaks = Array.from({ length: 130 }, make)
    }
    window.addEventListener('resize', onResize, { passive: true })
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [ref])
}

/** Screen 01 — slow breathing mesh gradient (deep blue + a touch of lime). */
export function useMeshField(ref: CanvasRef) {
  useEffect(() => {
    const cv = ref.current
    if (!cv || prefersReducedMotion()) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let dim = fitCanvas(cv, dpr)
    let raf = 0
    let t = 0
    const blobs = [
      { r: 0.55, c: 'rgba(52,88,150,0.6)', px: 0.3, py: 0.4, sx: 0.6, sy: 0.5 },
      { r: 0.5, c: 'rgba(28,52,98,0.62)', px: 0.7, py: 0.55, sx: 0.8, sy: 0.7 },
      {
        r: 0.34,
        c: 'rgba(205,255,78,0.22)',
        px: 0.55,
        py: 0.4,
        sx: 1.1,
        sy: 0.9,
      },
      { r: 0.45, c: 'rgba(30,30,50,0.6)', px: 0.42, py: 0.7, sx: 0.5, sy: 0.8 },
    ]

    const loop = () => {
      if (isOnScreen(cv, 80)) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, dim.w, dim.h)
        ctx.fillStyle = '#06070a'
        ctx.fillRect(0, 0, dim.w, dim.h)
        ctx.globalCompositeOperation = 'lighter'
        t += 0.004
        for (const b of blobs) {
          const x = (b.px + Math.sin(t * b.sx) * 0.12) * dim.w
          const y = (b.py + Math.cos(t * b.sy) * 0.12) * dim.h
          const rad = b.r * Math.max(dim.w, dim.h)
          const g = ctx.createRadialGradient(x, y, 0, x, y, rad)
          g.addColorStop(0, b.c)
          g.addColorStop(1, 'rgba(6,7,10,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, dim.w, dim.h)
        }
        ctx.globalCompositeOperation = 'source-over'
      }
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      dim = fitCanvas(cv, dpr)
    }
    window.addEventListener('resize', onResize, { passive: true })
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [ref])
}

/** Screen 04 — telemetry oscilloscope: faint grid + a glowing lime sine wave. */
export function useScope(ref: CanvasRef) {
  useEffect(() => {
    const cv = ref.current
    if (!cv || prefersReducedMotion()) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let dim = fitCanvas(cv, dpr)
    let raf = 0
    let ph = 0

    const loop = () => {
      if (isOnScreen(cv, 60)) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, dim.w, dim.h)
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 1
        for (let x = 0; x <= dim.w; x += 32) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, dim.h)
          ctx.stroke()
        }
        for (let y = 0; y <= dim.h; y += 32) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(dim.w, y)
          ctx.stroke()
        }
        ph += 0.05
        const mid = dim.h / 2
        ctx.strokeStyle = '#cdff4e'
        ctx.lineWidth = 1.6
        ctx.shadowColor = 'rgba(205,255,78,.8)'
        ctx.shadowBlur = 8
        ctx.beginPath()
        for (let x = 0; x <= dim.w; x++) {
          const y =
            mid +
            Math.sin(x * 0.045 + ph) * (dim.h * 0.22) +
            Math.sin(x * 0.18 + ph * 1.7) * 4
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      dim = fitCanvas(cv, dpr)
    }
    window.addEventListener('resize', onResize, { passive: true })
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [ref])
}
