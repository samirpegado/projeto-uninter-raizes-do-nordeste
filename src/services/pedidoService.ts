import { pedidos, type Pedido, type ItemPedido, type StatusPedido, type StatusPagamento } from '../data/pedidos'

export function criarPedido(dados: {
  usuario_id: string
  loja_id: string
  itens: ItemPedido[]
  total: number
}): Pedido {
  const pedido: Pedido = {
    ...dados,
    id: `ped-${Date.now()}`,
    status: 'recebido',
    pagamento_status: 'pendente',
    data: new Date().toISOString(),
  }

  pedidos.push(pedido)

  return pedido
}

export function atualizarStatusPagamento(pedido_id: string, status: StatusPagamento): Pedido | null {
  const pedido = pedidos.find((p) => p.id === pedido_id)

  if (!pedido) return null

  pedido.pagamento_status = status

  if (status === 'aprovado') {
    pedido.status = 'preparo'
  }

  return pedido
}

export function atualizarStatusPedido(pedido_id: string, status: StatusPedido): Pedido | null {
  const pedido = pedidos.find((p) => p.id === pedido_id)

  if (!pedido) return null

  pedido.status = status

  return pedido
}

export function buscarPedidosPorUsuario(usuario_id: string): Pedido[] {
  return pedidos.filter((p) => p.usuario_id === usuario_id)
}

export function buscarPedidoPorId(pedido_id: string): Pedido | undefined {
  return pedidos.find((p) => p.id === pedido_id)
}

export function buscarTodosPedidos(): Pedido[] {
  return [...pedidos]
}
