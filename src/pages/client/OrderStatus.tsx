import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarPedidoPorId, atualizarStatusPedido } from '../../services/pedidoService'
import type { Pedido, StatusPedido } from '../../data/pedidos'
import { Button } from '../../components/ui/Button'

const statusOrdem: StatusPedido[] = ['recebido', 'preparo', 'pronto', 'finalizado']

const statusLabel: Record<StatusPedido, string> = {
  recebido: 'Pedido recebido',
  preparo: 'Em preparo',
  pronto: 'Pronto para retirada',
  finalizado: 'Finalizado',
}

const statusEmoji: Record<StatusPedido, string> = {
  recebido: '📋',
  preparo: '👨‍🍳',
  pronto: '✅',
  finalizado: '🎉',
}

export function OrderStatus() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState<Pedido | null>(null)

  useEffect(() => {
    if (!id) return
    const p = buscarPedidoPorId(id)
    if (p) setPedido(p)
  }, [id])

  // simula atualizacao de status automatica se pagamento aprovado
  useEffect(() => {
    if (!pedido || pedido.pagamento_status !== 'aprovado') return
    if (pedido.status === 'finalizado' || pedido.status === 'pronto') return

    const timer = setTimeout(() => {
      const idx = statusOrdem.indexOf(pedido.status)
      if (idx < statusOrdem.length - 1) {
        const novoStatus = statusOrdem[idx + 1]
        const atualizado = atualizarStatusPedido(pedido.id, novoStatus)
        if (atualizado) setPedido({ ...atualizado })
      }
    }, 5000) // avanca o status a cada 5s pra demo

    return () => clearTimeout(timer)
  }, [pedido])

  if (!pedido) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">pedido nao encontrado</p>
          <Button onClick={() => navigate('/menu')}>Voltar ao menu</Button>
        </div>
      </div>
    )
  }

  const statusAtualIdx = statusOrdem.indexOf(pedido.status)
  const pagamentoRecusado = pedido.pagamento_status === 'recusado'

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-amber-800 mb-1">Acompanhar pedido</h1>
        <p className="text-sm text-gray-500 mb-6 font-mono">{pedido.id}</p>

        {pagamentoRecusado ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-6">
            <span className="text-4xl block mb-3">❌</span>
            <h2 className="font-bold text-red-700 mb-1">Pagamento recusado</h2>
            <p className="text-sm text-red-500">
              o pagamento nao foi aprovado. tente novamente com outro metodo.
            </p>
            <Button
              className="mt-4"
              onClick={() => navigate('/checkout')}
              variant="danger"
            >
              Tentar novamente
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
            <div className="flex flex-col gap-4">
              {statusOrdem.map((status, idx) => {
                const ativo = idx === statusAtualIdx
                const concluido = idx < statusAtualIdx

                return (
                  <div key={status} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                        concluido
                          ? 'bg-green-100 text-green-600'
                          : ativo
                          ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400'
                          : 'bg-gray-100 text-gray-300'
                      }`}
                    >
                      {concluido ? '✓' : statusEmoji[status]}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          ativo ? 'text-amber-700' : concluido ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {statusLabel[status]}
                      </p>
                      {ativo && pedido.status !== 'finalizado' && (
                        <p className="text-xs text-gray-400 mt-0.5">atualizando automaticamente...</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-gray-700 text-sm mb-3">Resumo</h2>
          {pedido.itens.map((item) => (
            <div key={item.produto_id} className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.quantidade}x {item.nome}</span>
              <span>R$ {(item.quantidade * item.preco_unitario).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-800 text-sm">
            <span>Total</span>
            <span>R$ {pedido.total.toFixed(2)}</span>
          </div>
        </div>

        <Button variant="ghost" onClick={() => navigate('/menu')} className="w-full">
          Fazer novo pedido
        </Button>
      </div>
    </div>
  )
}
