import { useState } from 'react'
import { buscarTodosPedidos, atualizarStatusPedido } from '../../services/pedidoService'
import type { StatusPedido } from '../../data/pedidos'
import { Button } from '../../components/ui/Button'

const statusOpcoes: StatusPedido[] = ['recebido', 'preparo', 'pronto', 'finalizado']

const statusColor: Record<StatusPedido, string> = {
  recebido: 'bg-blue-100 text-blue-700',
  preparo: 'bg-yellow-100 text-yellow-700',
  pronto: 'bg-green-100 text-green-700',
  finalizado: 'bg-gray-100 text-gray-600',
}

export function GerenciarPedidos() {
  const [, forceUpdate] = useState(0)

  const pedidos = buscarTodosPedidos().sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )

  function handleAvancarStatus(pedido_id: string, statusAtual: StatusPedido) {
    const idx = statusOpcoes.indexOf(statusAtual)
    if (idx >= statusOpcoes.length - 1) return
    atualizarStatusPedido(pedido_id, statusOpcoes[idx + 1])
    forceUpdate((n) => n + 1)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="font-semibold text-gray-700 mb-4">Todos os pedidos</h2>

      {pedidos.length === 0 ? (
        <p className="text-sm text-gray-400">nenhum pedido ainda</p>
      ) : (
        <div className="flex flex-col gap-3">
          {pedidos.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <p className="font-mono text-xs text-gray-400">{p.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.data).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    p.pagamento_status === 'aprovado' ? 'bg-green-100 text-green-700' :
                    p.pagamento_status === 'recusado' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.pagamento_status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                {p.itens.map((item) => (
                  <span key={item.produto_id} className="mr-3">
                    {item.quantidade}x {item.nome}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-sm">R$ {p.total.toFixed(2)}</span>
                {p.status !== 'finalizado' && p.pagamento_status === 'aprovado' && (
                  <Button
                    size="sm"
                    onClick={() => handleAvancarStatus(p.id, p.status)}
                  >
                    Avancar status →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
