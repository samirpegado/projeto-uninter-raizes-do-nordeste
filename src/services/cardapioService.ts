import { cardapios, type Cardapio, type ItemCardapio } from '../data/cardapios'
import { lojas } from '../data/lojas'

export function buscarCardapioPorLoja(loja_id: string): Cardapio | null {
  const loja = lojas.find((l) => l.id === loja_id)
  if (!loja) return null

  const cardapio = cardapios.find((c) => c.id === loja.cardapio_id)
  if (!cardapio) return null

  return cardapio
}

export function buscarItemPorId(item_id: string): ItemCardapio | null {
  for (const cardapio of cardapios) {
    const item = cardapio.itens.find((i) => i.id === item_id)
    if (item) return item
  }
  return null
}

export function adicionarItemCardapio(cardapio_id: string, item: Omit<ItemCardapio, 'id'>): ItemCardapio {
  const cardapio = cardapios.find((c) => c.id === cardapio_id)
  if (!cardapio) throw new Error('cardapio nao encontrado')

  const novoItem: ItemCardapio = {
    ...item,
    id: `p-${Date.now()}`,
  }

  cardapio.itens.push(novoItem)

  return novoItem
}

export function removerItemCardapio(cardapio_id: string, item_id: string): boolean {
  const cardapio = cardapios.find((c) => c.id === cardapio_id)
  if (!cardapio) return false

  const idx = cardapio.itens.findIndex((i) => i.id === item_id)
  if (idx === -1) return false

  cardapio.itens.splice(idx, 1)

  return true
}
