import React, { createContext, useContext, useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { authService, AuthUser } from '@/services/auth'

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  register: (name: string, email: string, password: string) => Promise<AuthUser>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getCurrentUser())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Listen for PocketBase auth changes
    const removeListener = pb.authStore.onChange(() => {
      setUser(authService.getCurrentUser())
    })

    setUser(authService.getCurrentUser())
    setIsLoading(false)

    return () => {
      removeListener()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password)
    setUser(u)
    return u
  }

  const register = async (name: string, email: string, password: string) => {
    const u = await authService.register(name, email, password)
    setUser(u)
    return u
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && authService.isAuthenticated(),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return ctx
}
