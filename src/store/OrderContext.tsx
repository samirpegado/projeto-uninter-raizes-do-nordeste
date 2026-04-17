import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Pedido } from '../data/pedidos'

interface OrderContextType {
  pedidoAtual: Pedido | null
  setPedidoAtual: (p: Pedido | null) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [pedidoAtual, setPedidoAtual] = useState<Pedido | null>(null)

  return (
    <OrderContext.Provider value={{ pedidoAtual, setPedidoAtual }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder precisa estar dentro do OrderProvider')
  return ctx
}
