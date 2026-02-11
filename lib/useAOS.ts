import { useEffect } from 'react'

export function useAOS() {
  useEffect(() => {
    // Carrega AOS dinamicamente no cliente
    const loadAOS = async () => {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        const AOS = (await import('aos')).default
        AOS.init({ duration: 800 })
      }
    }

    loadAOS()
  }, [])
}
