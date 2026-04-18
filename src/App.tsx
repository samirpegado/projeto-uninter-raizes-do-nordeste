import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './store/AuthContext'
import { CartProvider } from './store/CartContext'
import { OrderProvider } from './store/OrderContext'
import { Header } from './components/shared/Header'
import { LgpdBanner } from './components/shared/LgpdBanner'
import { Login } from './pages/client/Login'
import { StoreSelector } from './pages/client/StoreSelector'
import { Menu } from './pages/client/Menu'
import { Checkout } from './pages/client/Checkout'
import { OrderStatus } from './pages/client/OrderStatus'
import { MeusPedidos } from './pages/client/MeusPedidos'
import { PaymentSimulator } from './pages/PaymentSimulator'
import { Dashboard } from './pages/admin/Dashboard'
import { TotemFlow } from './pages/totem/TotemFlow'
import { Privacidade } from './pages/Privacidade'
import type { ReactNode } from 'react'

// guarda de rota pra usuario logado
function RotaPrivada({ children }: { children: ReactNode }) {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/login" replace />
  return <>{children}</>
}

// guarda de rota pra admin
function RotaAdmin({ children }: { children: ReactNode }) {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/login" replace />
  if (usuario.tipo !== 'admin') return <Navigate to="/lojas" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/totem" element={<TotemFlow />} />

          <Route
            path="/lojas"
            element={
              <RotaPrivada>
                <StoreSelector />
              </RotaPrivada>
            }
          />
          <Route
            path="/menu"
            element={
              <RotaPrivada>
                <Menu />
              </RotaPrivada>
            }
          />
          <Route
            path="/checkout"
            element={
              <RotaPrivada>
                <Checkout />
              </RotaPrivada>
            }
          />
          <Route
            path="/pagamento"
            element={
              <RotaPrivada>
                <PaymentSimulator />
              </RotaPrivada>
            }
          />
          <Route
            path="/pedido/:id"
            element={
              <RotaPrivada>
                <OrderStatus />
              </RotaPrivada>
            }
          />
          <Route
            path="/pedidos"
            element={
              <RotaPrivada>
                <MeusPedidos />
              </RotaPrivada>
            }
          />
          <Route
            path="/admin"
            element={
              <RotaAdmin>
                <Dashboard />
              </RotaAdmin>
            }
          />

          {/* redireciona raiz pro login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
      <LgpdBanner />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <AppRoutes />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
