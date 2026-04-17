import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { useCart } from '../../store/CartContext'
import { useOrder } from '../../store/OrderContext'
import { criarPedido } from '../../services/pedidoService'
import { Button } from '../../components/ui/Button'

export function Checkout() {
  const { usuario } = useAuth()
  const { itens, total, limpar } = useCart()
  const { setPedidoAtual } = useOrder()
  const navigate = useNavigate()

  if (itens.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">seu carrinho ta vazio</p>
          <Button onClick={() => navigate('/menu')}>Ver cardapio</Button>
        </div>
      </div>
    )
  }

  function handleFinalizarCompra() {
    if (!usuario) return

    const pedido = criarPedido({
      usuario_id: usuario.id,
      loja_id: usuario.loja_id,
      itens: itens.map((i) => ({
        produto_id: i.produto_id,
        nome: i.nome,
        quantidade: i.quantidade,
        preco_unitario: i.preco_unitario,
      })),
      total,
    })

    setPedidoAtual(pedido)
    limpar()
    navigate('/pagamento')
  }

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Revisar pedido</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
          <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">
            Itens do pedido
          </h2>
          <div className="flex flex-col gap-3">
            {itens.map((item) => (
              <div key={item.produto_id} className="flex items-center gap-3">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.nome}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantidade}x R$ {item.preco_unitario.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Taxa de servico</span>
            <span className="text-green-600">gratis</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate('/menu')} className="flex-1">
            Voltar
          </Button>
          <Button onClick={handleFinalizarCompra} className="flex-1" size="lg">
            Ir para pagamento
          </Button>
        </div>
      </div>
    </div>
  )
}
