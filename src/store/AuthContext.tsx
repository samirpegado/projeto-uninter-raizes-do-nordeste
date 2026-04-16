import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Usuario } from '../data/usuarios'

interface AuthContextType {
  usuario: Usuario | null
  setUsuario: (u: Usuario | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  function logout() {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro do AuthProvider')
  return ctx
}
