import { useState } from 'react'
import { cardapios } from '../../data/cardapios'
import { lojas } from '../../data/lojas'
import { criarPedido } from '../../services/pedidoService'
import { atualizarStatusPagamento } from '../../services/pedidoService'
import type { ItemCardapio } from '../../data/cardapios'
import type { Pedido } from '../../data/pedidos'

type Etapa = 'menu' | 'carrinho' | 'pagamento' | 'confirmacao'

interface ItemCarrinho {
  produto_id: string
  nome: string
  quantidade: number
  preco_unitario: number
  imagem: string
}

// totem usa a primeira loja por padrao
const LOJA_TOTEM = lojas[0]
const CARDAPIO_TOTEM = cardapios.find((c) => c.id === LOJA_TOTEM?.cardapio_id) ?? cardapios[0]

export function TotemFlow() {
  const [etapa, setEtapa] = useState<Etapa>('menu')
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const [pedidoFinalizado, setPedidoFinalizado] = useState<Pedido | null>(null)
  const [processando, setProcessando] = useState(false)
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')

  const total = itens.reduce((acc, i) => acc + i.preco_unitario * i.quantidade, 0)
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  const categorias = ['Todos', ...Array.from(new Set(CARDAPIO_TOTEM?.itens.map((i) => i.categoria) ?? []))]
  const itensFiltrados = categoriaAtiva === 'Todos'
    ? CARDAPIO_TOTEM?.itens ?? []
    : CARDAPIO_TOTEM?.itens.filter((i) => i.categoria === categoriaAtiva) ?? []

  function adicionarItem(produto: ItemCardapio) {
    setItens((prev) => {
      const existente = prev.find((i) => i.produto_id === produto.id)
      if (existente) {
        return prev.map((i) =>
          i.produto_id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, {
        produto_id: produto.id,
        nome: produto.nome,
        quantidade: 1,
        preco_unitario: produto.preco,
        imagem: produto.imagem,
      }]
    })
  }

  function alterarQtd(produto_id: string, qtd: number) {
    if (qtd <= 0) {
      setItens((prev) => prev.filter((i) => i.produto_id !== produto_id))
    } else {
      setItens((prev) => prev.map((i) => i.produto_id === produto_id ? { ...i, quantidade: qtd } : i))
    }
  }

  function handlePagamento(aprovado: boolean) {
    setProcessando(true)

    setTimeout(() => {
      const pedido = criarPedido({
        usuario_id: 'totem',
        loja_id: LOJA_TOTEM?.id ?? 'l-001',
        itens: itens.map((i) => ({
          produto_id: i.produto_id,
          nome: i.nome,
          quantidade: i.quantidade,
          preco_unitario: i.preco_unitario,
        })),
        total,
      })

      const status = aprovado ? 'aprovado' : 'recusado'
      atualizarStatusPagamento(pedido.id, status)
      pedido.pagamento_status = status

      setPedidoFinalizado(pedido)
      setProcessando(false)
      setEtapa('confirmacao')
    }, 1500)
  }

  function reiniciar() {
    setItens([])
    setPedidoFinalizado(null)
    setEtapa('menu')
    setCategoriaAtiva('Todos')
  }

  function getQtd(produto_id: string) {
    return itens.find((i) => i.produto_id === produto_id)?.quantidade ?? 0
  }

  // tela de confirmacao
  if (etapa === 'confirmacao') {
    const aprovado = pedidoFinalizado?.pagamento_status === 'aprovado'
    return (
      <div className="min-h-screen bg-amber-800 flex items-center justify-center px-6">
        <div className="text-center text-white max-w-sm">
          <div className="text-8xl mb-6">{aprovado ? '✅' : '❌'}</div>
          <h1 className="text-3xl font-bold mb-3">
            {aprovado ? 'Pedido confirmado!' : 'Pagamento recusado'}
          </h1>
          {aprovado && pedidoFinalizado && (
            <p className="text-amber-200 text-lg mb-2">
              seu pedido esta sendo preparado
            </p>
          )}
          {!aprovado && (
            <p className="text-amber-200 mb-2">tente novamente com outro metodo</p>
          )}
          <button
            onClick={reiniciar}
            className="mt-8 bg-white text-amber-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-amber-50 transition-colors"
          >
            Novo pedido
          </button>
        </div>
      </div>
    )
  }

  // tela de pagamento
  if (etapa === 'pagamento') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">💳</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Pagamento</h2>
          <p className="text-gray-400 text-sm mb-6">simulacao de gateway</p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-2xl font-bold text-gray-800">R$ {total.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{totalItens} item(s)</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handlePagamento(true)}
              disabled={processando}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
            >
              {processando ? 'processando...' : '✓ Aprovar'}
            </button>
            <button
              onClick={() => handlePagamento(false)}
              disabled={processando}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
            >
              ✕ Recusar
            </button>
            <button
              onClick={() => setEtapa('carrinho')}
              disabled={processando}
              className="text-gray-500 text-sm mt-2 hover:text-gray-700"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // tela do carrinho
  if (etapa === 'carrinho') {
    return (
      <div className="min-h-screen bg-amber-50 px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-amber-800">Seu pedido</h1>
            <button onClick={() => setEtapa('menu')} className="text-amber-700 text-sm hover:underline">
              ← Voltar
            </button>
          </div>

          {itens.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">carrinho vazio</p>
              <button
                onClick={() => setEtapa('menu')}
                className="bg-amber-700 text-white px-6 py-3 rounded-xl font-medium"
              >
                Ver cardapio
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 mb-6">
                {itens.map((item) => (
                  <div key={item.produto_id} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
                    <img src={item.imagem} alt={item.nome} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.nome}</p>
                      <p className="text-sm text-gray-500">R$ {item.preco_unitario.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alterarQtd(item.produto_id, item.quantidade - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-semibold">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQtd(item.produto_id, item.quantidade + 1)}
                        className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                <div className="flex justify-between font-bold text-gray-800 text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setEtapa('pagamento')}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
              >
                Ir para pagamento →
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // tela do menu (etapa padrao)
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-amber-800 text-white px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">🌵 Raizes do Nordeste</h1>
        <button
          onClick={() => setEtapa('carrinho')}
          className="relative bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🛒 Carrinho
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItens}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                categoriaAtiva === cat
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {itensFiltrados.map((item) => {
            const qtd = getQtd(item.id)
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{item.nome}</p>
                  <p className="font-bold text-amber-700 text-sm mb-2">R$ {item.preco.toFixed(2)}</p>
                  {qtd === 0 ? (
                    <button
                      onClick={() => adicionarItem(item)}
                      className="w-full bg-amber-700 hover:bg-amber-600 text-white text-sm py-2 rounded-lg transition-colors"
                    >
                      Adicionar
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => alterarQtd(item.id, qtd - 1)}
                        className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="font-semibold text-sm">{qtd}</span>
                      <button
                        onClick={() => alterarQtd(item.id, qtd + 1)}
                        className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
