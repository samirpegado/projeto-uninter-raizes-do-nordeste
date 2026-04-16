export type StatusPedido = 'recebido' | 'preparo' | 'pronto' | 'finalizado'
export type StatusPagamento = 'pendente' | 'aprovado' | 'recusado'

export interface ItemPedido {
  produto_id: string
  nome: string
  quantidade: number
  preco_unitario: number
}

export interface Pedido {
  id: string
  usuario_id: string
  loja_id: string
  itens: ItemPedido[]
  total: number
  status: StatusPedido
  pagamento_status: StatusPagamento
  data: string
}

// usando let pra poder fazer push nos mocks
export let pedidos: Pedido[] = [
  {
    id: 'ped-001',
    usuario_id: 'u-001',
    loja_id: 'l-001',
    itens: [
      {
        produto_id: 'p-001',
        nome: 'Baiao de Dois',
        quantidade: 2,
        preco_unitario: 25.9,
      },
    ],
    total: 51.8,
    status: 'finalizado',
    pagamento_status: 'aprovado',
    data: '2024-11-10T14:32:00Z',
  },
  {
    id: 'ped-002',
    usuario_id: 'u-001',
    loja_id: 'l-001',
    itens: [
      {
        produto_id: 'p-003',
        nome: 'Tapioca Recheada',
        quantidade: 1,
        preco_unitario: 12.0,
      },
      {
        produto_id: 'p-006',
        nome: 'Suco de Umbu',
        quantidade: 2,
        preco_unitario: 8.0,
      },
    ],
    total: 28.0,
    status: 'preparo',
    pagamento_status: 'aprovado',
    data: '2024-11-12T10:15:00Z',
  },
]
