'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti() {
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration

    const shoot = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 1000,
      })
    }

    const interval: number = window.setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(interval)
        return
      }
      shoot()
    }, 250)

    return () => window.clearInterval(interval)
  }, [])

  return null
}
