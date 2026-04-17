import { useNavigate } from 'react-router-dom'
import { lojas } from '../../data/lojas'
import { useAuth } from '../../store/AuthContext'

export function StoreSelector() {
  const { setUsuario, usuario } = useAuth()
  const navigate = useNavigate()

  function handleSelecionarLoja(loja_id: string) {
    if (!usuario) return
    setUsuario({ ...usuario, loja_id })
    navigate('/menu')
  }

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-800 mb-2">Escolha uma unidade</h1>
        <p className="text-gray-500 text-sm mb-6">selecione a loja mais proxima de voce</p>

        <div className="flex flex-col gap-4">
          {lojas.map((loja) => (
            <button
              key={loja.id}
              onClick={() => handleSelecionarLoja(loja.id)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-left hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-gray-800">{loja.nome}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {loja.endereco.rua}, {loja.endereco.numero} — {loja.endereco.cidade}/{loja.endereco.estado}
                  </p>
                </div>
                <span className="text-amber-600 text-lg">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
