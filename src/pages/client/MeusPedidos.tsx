import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { buscarPedidosPorUsuario } from '../../services/pedidoService'
import { Button } from '../../components/ui/Button'
import type { StatusPedido, StatusPagamento } from '../../data/pedidos'

const statusColor: Record<StatusPedido, string> = {
  recebido: 'bg-blue-100 text-blue-700',
  preparo: 'bg-yellow-100 text-yellow-700',
  pronto: 'bg-green-100 text-green-700',
  finalizado: 'bg-gray-100 text-gray-600',
}

const pagamentoColor: Record<StatusPagamento, string> = {
  pendente: 'text-yellow-600',
  aprovado: 'text-green-600',
  recusado: 'text-red-600',
}

export function MeusPedidos() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const pedidos = usuario ? buscarPedidosPorUsuario(usuario.id) : []
  const pedidosOrdenados = [...pedidos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Meus pedidos</h1>

        {pedidosOrdenados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">voce ainda nao fez nenhum pedido</p>
            <Button onClick={() => navigate('/menu')}>Ver cardapio</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pedidosOrdenados.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/pedido/${pedido.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono text-xs text-gray-400">{pedido.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(pedido.data).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[pedido.status]}`}>
                    {pedido.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  {pedido.itens.map((item) => (
                    <span key={item.produto_id} className="mr-2">
                      {item.quantidade}x {item.nome}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${pagamentoColor[pedido.pagamento_status]}`}>
                    pagamento: {pedido.pagamento_status}
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    R$ {pedido.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
