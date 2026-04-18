import { useState } from 'react'
import { colaboradores as dadosColaboradores, type Colaborador, type FuncaoColaborador } from '../../data/colaboradores'
import { lojas } from '../../data/lojas'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function GerenciarColaboradores() {
  const [lista, setLista] = useState<Colaborador[]>([...dadosColaboradores])
  const [adicionando, setAdicionando] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    funcao: 'Atendente' as FuncaoColaborador,
    loja_id: lojas[0]?.id ?? '',
  })

  function handleAdicionar(e: React.FormEvent) {
    e.preventDefault()

    const novo: Colaborador = {
      ...form,
      id: `col-${Date.now()}`,
    }

    dadosColaboradores.push(novo)
    setLista([...dadosColaboradores])
    setAdicionando(false)
    setForm({ nome: '', email: '', telefone: '', funcao: 'Atendente', loja_id: lojas[0]?.id ?? '' })
  }

  function handleRemover(id: string) {
    const idx = dadosColaboradores.findIndex((c) => c.id === id)
    if (idx !== -1) dadosColaboradores.splice(idx, 1)
    setLista([...dadosColaboradores])
  }

  function nomeLoja(loja_id: string) {
    return lojas.find((l) => l.id === loja_id)?.nome ?? loja_id
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">Colaboradores</h2>
        <Button size="sm" onClick={() => setAdicionando(!adicionando)}>
          {adicionando ? 'Cancelar' : '+ Adicionar'}
        </Button>
      </div>

      {adicionando && (
        <form onSubmit={handleAdicionar} className="bg-amber-50 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Funcao</label>
            <select
              value={form.funcao}
              onChange={(e) => setForm({ ...form, funcao: e.target.value as FuncaoColaborador })}
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>Gerente</option>
              <option>Atendente</option>
              <option>Garcom</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Loja</label>
            <select
              value={form.loja_id}
              onChange={(e) => setForm({ ...form, loja_id: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            >
              {lojas.map((l) => (
                <option key={l.id} value={l.id}>{l.nome}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" size="sm">Salvar</Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2 font-medium">Nome</th>
              <th className="pb-2 font-medium">Funcao</th>
              <th className="pb-2 font-medium">Loja</th>
              <th className="pb-2 font-medium">Contato</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{c.nome}</td>
                <td className="py-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {c.funcao}
                  </span>
                </td>
                <td className="py-3 text-gray-600 text-xs">{nomeLoja(c.loja_id)}</td>
                <td className="py-3 text-gray-600">{c.email}</td>
                <td className="py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemover(c.id)}
                    className="text-red-500 border-red-200"
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
