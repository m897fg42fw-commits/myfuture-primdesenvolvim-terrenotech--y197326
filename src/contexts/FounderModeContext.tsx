import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export const ADMIN_EMAIL = 'me.candre14@gmail.com'
const STORAGE_KEY = 'terrenotech_founder_mode'

interface FounderModeContextType {
  isFounderMode: boolean
  canAccessFounderMode: boolean
  toggleFounderMode: () => void
  setFounderMode: (enabled: boolean) => void
}

const FounderModeContext = createContext<FounderModeContextType | undefined>(undefined)

export const FounderModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const canAccessFounderMode =
    isAuthenticated && user?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()

  const [isFounderMode, setIsFounderModeState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEY) === 'true'
  })

  // Sincroniza se o usuário não tiver permissão: garante que público NUNCA veja modo fundador
  useEffect(() => {
    if (!canAccessFounderMode) {
      setIsFounderModeState(false)
    } else {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'true') {
        setIsFounderModeState(true)
      }
    }
  }, [canAccessFounderMode])

  const toggleFounderMode = () => {
    if (!canAccessFounderMode) return
    setIsFounderModeState((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  const setFounderMode = (enabled: boolean) => {
    if (!canAccessFounderMode) return
    setIsFounderModeState(enabled)
    localStorage.setItem(STORAGE_KEY, String(enabled))
  }

  // O público ou usuário comum NUNCA tem isFounderMode como true
  const effectiveFounderMode = canAccessFounderMode && isFounderMode

  return (
    <FounderModeContext.Provider
      value={{
        isFounderMode: effectiveFounderMode,
        canAccessFounderMode,
        toggleFounderMode,
        setFounderMode,
      }}
    >
      {children}
    </FounderModeContext.Provider>
  )
}

export const useFounderMode = () => {
  const context = useContext(FounderModeContext)
  if (!context) {
    throw new Error('useFounderMode deve ser usado dentro de FounderModeProvider')
  }
  return context
}
