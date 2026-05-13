import { useState, useCallback } from 'react'

const STORAGE_KEY = 'recipe-favorites'

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch {
    // ignore parse errors
  }
  return new Set()
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites)

  const toggle = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  return { favorites, toggle }
}
