import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder } from '../store/OrderContext'
import { atualizarStatusPagamento } from '../services/pedidoService'
import { Button } from '../components/ui/Button'

export function PaymentSimulator() {
  const { pedidoAtual, setPedidoAtual } = useOrder()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (!pedidoAtual) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">nenhum pedido encontrado</p>
          <Button onClick={() => navigate('/menu')}>Voltar ao menu</Button>
        </div>
      </div>
    )
  }

  function handlePagamento(aprovado: boolean) {
    if (!pedidoAtual) return
    setLoading(true)

    // simula delay do gateway externo
    setTimeout(() => {
      const status = aprovado ? 'aprovado' : 'recusado'
      const pedidoAtualizado = atualizarStatusPagamento(pedidoAtual.id, status)

      if (pedidoAtualizado) {
        setPedidoAtual(pedidoAtualizado)
      }

      setLoading(false)
      navigate(`/pedido/${pedidoAtual.id}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        {/* header simulando gateway externo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">💳</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Gateway de Pagamento</h1>
          <p className="text-sm text-gray-400 mt-1">ambiente de simulacao</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Pedido</span>
            <span className="font-mono text-xs">{pedidoAtual.id}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-800">
            <span>Valor total</span>
            <span>R$ {pedidoAtual.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mb-6">
          escolha o resultado do pagamento para simular o retorno do gateway:
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => handlePagamento(true)}
            loading={loading}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-500"
          >
            ✓ Aprovar pagamento
          </Button>
          <Button
            onClick={() => handlePagamento(false)}
            loading={loading}
            variant="danger"
            size="lg"
            className="w-full"
          >
            ✕ Recusar pagamento
          </Button>
        </div>

        <p className="text-xs text-gray-300 text-center mt-6">
          isso e uma simulacao. nenhum valor real sera cobrado.
        </p>
      </div>
    </div>
  )
}
