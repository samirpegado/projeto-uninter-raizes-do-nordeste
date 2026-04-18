import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { usuarios } from '../../data/usuarios'
import { lojas } from '../../data/lojas'
import { buscarTodosPedidos } from '../../services/pedidoService'
import { colaboradores } from '../../data/colaboradores'
import { GerenciarClientes } from './GerenciarClientes'
import { GerenciarColaboradores } from './GerenciarColaboradores'
import { GerenciarCardapio } from './GerenciarCardapio'
import { GerenciarPedidos } from './GerenciarPedidos'

type Aba = 'overview' | 'clientes' | 'colaboradores' | 'cardapio' | 'pedidos'

export function Dashboard() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [abaAtiva, setAbaAtiva] = useState<Aba>('overview')

  if (!usuario || usuario.tipo !== 'admin') {
    navigate('/login')
    return null
  }

  const pedidosHoje = buscarTodosPedidos().filter((p) => {
    const hoje = new Date().toDateString()
    return new Date(p.data).toDateString() === hoje
  }).length

  const abas: { id: Aba; label: string; emoji: string }[] = [
    { id: 'overview', label: 'Visao Geral', emoji: '📊' },
    { id: 'pedidos', label: 'Pedidos', emoji: '📋' },
    { id: 'clientes', label: 'Clientes', emoji: '👥' },
    { id: 'colaboradores', label: 'Colaboradores', emoji: '👷' },
    { id: 'cardapio', label: 'Cardapio', emoji: '🍽️' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-sm text-gray-500">bem vindo, {usuario.nome}</p>
        </div>

        {/* tabs */}
        <div className="flex gap-1 overflow-x-auto mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {abas.map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                abaAtiva === aba.id
                  ? 'bg-amber-700 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{aba.emoji}</span>
              {aba.label}
            </button>
          ))}
        </div>

        {/* conteudo */}
        {abaAtiva === 'overview' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <StatCard label="Lojas" valor={lojas.length} emoji="🏪" />
              <StatCard label="Clientes" valor={usuarios.filter((u) => u.tipo === 'cliente').length} emoji="👥" />
              <StatCard label="Colaboradores" valor={colaboradores.length} emoji="👷" />
              <StatCard label="Pedidos hoje" valor={pedidosHoje} emoji="📋" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-700 mb-4">Ultimos pedidos</h2>
              <UltimosPedidos />
            </div>
          </div>
        )}

        {abaAtiva === 'clientes' && <GerenciarClientes />}
        {abaAtiva === 'colaboradores' && <GerenciarColaboradores />}
        {abaAtiva === 'cardapio' && <GerenciarCardapio />}
        {abaAtiva === 'pedidos' && <GerenciarPedidos />}
      </div>
    </div>
  )
}

function StatCard({ label, valor, emoji }: { label: string; valor: number; emoji: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-2xl font-bold text-gray-800">{valor}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function UltimosPedidos() {
  const pedidos = buscarTodosPedidos()
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)

  if (pedidos.length === 0) {
    return <p className="text-sm text-gray-400">nenhum pedido ainda</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {pedidos.map((p) => (
        <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
          <div>
            <span className="font-mono text-xs text-gray-400">{p.id}</span>
            <span className="ml-3 text-gray-600">{p.itens.length} item(s)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">R$ {p.total.toFixed(2)}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              p.pagamento_status === 'aprovado' ? 'bg-green-100 text-green-700' :
              p.pagamento_status === 'recusado' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {p.pagamento_status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
