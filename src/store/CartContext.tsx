import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ItemCardapio } from '../data/cardapios'

interface ItemCarrinho {
  produto_id: string
  nome: string
  quantidade: number
  preco_unitario: number
  imagem: string
}

interface CartContextType {
  itens: ItemCarrinho[]
  total: number
  adicionarItem: (produto: ItemCardapio) => void
  removerItem: (produto_id: string) => void
  alterarQuantidade: (produto_id: string, quantidade: number) => void
  limpar: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  const total = itens.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0)

  function adicionarItem(produto: ItemCardapio) {
    setItens((prev) => {
      const existente = prev.find((i) => i.produto_id === produto.id)
      if (existente) {
        return prev.map((i) =>
          i.produto_id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [
        ...prev,
        {
          produto_id: produto.id,
          nome: produto.nome,
          quantidade: 1,
          preco_unitario: produto.preco,
          imagem: produto.imagem,
        },
      ]
    })
  }

  function removerItem(produto_id: string) {
    setItens((prev) => prev.filter((i) => i.produto_id !== produto_id))
  }

  function alterarQuantidade(produto_id: string, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(produto_id)
      return
    }
    setItens((prev) =>
      prev.map((i) => (i.produto_id === produto_id ? { ...i, quantidade } : i))
    )
  }

  function limpar() {
    setItens([])
  }

  return (
    <CartContext.Provider value={{ itens, total, adicionarItem, removerItem, alterarQuantidade, limpar }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro do CartProvider')
  return ctx
}
