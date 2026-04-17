import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { useCart } from '../../store/CartContext'
import { buscarCardapioPorLoja } from '../../services/cardapioService'
import { Button } from '../../components/ui/Button'
import type { ItemCardapio } from '../../data/cardapios'

export function Menu() {
  const { usuario } = useAuth()
  const { itens, adicionarItem, removerItem, alterarQuantidade, total } = useCart()
  const navigate = useNavigate()

  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todos')
  const [cartAberto, setCartAberto] = useState(false)

  const cardapio = usuario?.loja_id ? buscarCardapioPorLoja(usuario.loja_id) : null

  if (!cardapio) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">nenhum cardapio encontrado para essa loja</p>
          <Button onClick={() => navigate('/lojas')}>Voltar para lojas</Button>
        </div>
      </div>
    )
  }

  const categorias = ['Todos', ...Array.from(new Set(cardapio.itens.map((i) => i.categoria)))]

  const itensFiltrados =
    categoriaAtiva === 'Todos'
      ? cardapio.itens
      : cardapio.itens.filter((i) => i.categoria === categoriaAtiva)

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  function getQuantidade(produto_id: string) {
    return itens.find((i) => i.produto_id === produto_id)?.quantidade ?? 0
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-amber-800">Cardapio</h1>
            <p className="text-sm text-gray-500">{cardapio.nome}</p>
          </div>
          <button
            onClick={() => setCartAberto(true)}
            className="relative bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            🛒 Carrinho
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItens}
              </span>
            )}
          </button>
        </div>

        {/* filtro de categorias */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                categoriaAtiva === cat
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itensFiltrados.map((item) => (
            <CardProduto
              key={item.id}
              item={item}
              quantidade={getQuantidade(item.id)}
              onAdicionar={() => adicionarItem(item)}
              onRemover={() => removerItem(item.id)}
              onAlterarQtd={(q) => alterarQuantidade(item.id, q)}
            />
          ))}
        </div>
      </div>

      {/* drawer do carrinho */}
      {cartAberto && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setCartAberto(false)}
          />
          <div className="bg-white w-full max-w-sm shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Seu pedido</h2>
              <button onClick={() => setCartAberto(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {itens.length === 0 ? (
                <p className="text-gray-400 text-sm text-center mt-8">carrinho vazio</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {itens.map((item) => (
                    <div key={item.produto_id} className="flex items-center gap-3">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.nome}</p>
                        <p className="text-xs text-gray-500">
                          R$ {item.preco_unitario.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => alterarQuantidade(item.produto_id, item.quantidade - 1)}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-sm flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(item.produto_id, item.quantidade + 1)}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-sm flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {itens.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between text-sm font-semibold mb-3">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => { setCartAberto(false); navigate('/checkout') }}
                >
                  Ir para o checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface CardProdutoProps {
  item: ItemCardapio
  quantidade: number
  onAdicionar: () => void
  onRemover: () => void
  onAlterarQtd: (q: number) => void
}

function CardProduto({ item, quantidade, onAdicionar, onAlterarQtd }: CardProdutoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={item.imagem}
        alt={item.nome}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 text-sm">{item.nome}</h3>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">
            {item.categoria}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.descricao}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-700">R$ {item.preco.toFixed(2)}</span>

          {quantidade === 0 ? (
            <button
              onClick={onAdicionar}
              className="bg-amber-700 hover:bg-amber-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAlterarQtd(quantidade - 1)}
                className="w-7 h-7 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center font-bold"
              >
                −
              </button>
              <span className="text-sm font-semibold w-4 text-center">{quantidade}</span>
              <button
                onClick={() => onAlterarQtd(quantidade + 1)}
                className="w-7 h-7 rounded-full bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
