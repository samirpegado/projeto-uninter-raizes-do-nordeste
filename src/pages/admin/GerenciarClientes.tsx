import { useState } from 'react'
import { usuarios, type Usuario } from '../../data/usuarios'
import { excluirConta } from '../../services/authService'
import { Button } from '../../components/ui/Button'

export function GerenciarClientes() {
  const [lista, setLista] = useState<Usuario[]>(
    usuarios.filter((u) => u.tipo === 'cliente')
  )
  const [confirmandoExclusao, setConfirmandoExclusao] = useState<string | null>(null)

  function handleExcluir(id: string) {
    const ok = excluirConta(id)
    if (ok) {
      setLista((prev) => prev.filter((u) => u.id !== id))
    }
    setConfirmandoExclusao(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="font-semibold text-gray-700 mb-4">Clientes cadastrados</h2>

      {lista.length === 0 ? (
        <p className="text-sm text-gray-400">nenhum cliente cadastrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Nome</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Telefone</th>
                <th className="pb-2 font-medium">Pontos</th>
                <th className="pb-2 font-medium">LGPD</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((u) => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800">{u.nome}</td>
                  <td className="py-3 text-gray-600">{u.email}</td>
                  <td className="py-3 text-gray-600">{u.telefone}</td>
                  <td className="py-3 text-gray-600">{u.pontos}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      u.aceitou_lgpd ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {u.aceitou_lgpd ? 'aceito' : 'pendente'}
                    </span>
                  </td>
                  <td className="py-3">
                    {confirmandoExclusao === u.id ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="danger" onClick={() => handleExcluir(u.id)}>
                          Confirmar
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setConfirmandoExclusao(null)}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setConfirmandoExclusao(u.id)}
                        className="text-red-500 hover:text-red-700 border-red-200"
                      >
                        Excluir
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
