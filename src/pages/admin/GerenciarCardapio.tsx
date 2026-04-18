import { useState } from 'react'
import { cardapios } from '../../data/cardapios'
import { adicionarItemCardapio, removerItemCardapio } from '../../services/cardapioService'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import baiaoImg from '../../assets/cardapio/baiao-dois.png'

export function GerenciarCardapio() {
  const [cardapioSelecionado, setCardapioSelecionado] = useState(cardapios[0]?.id ?? '')
  const [adicionando, setAdicionando] = useState(false)
  const [, forceUpdate] = useState(0)
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: 'Pratos',
    imagem: '',
  })

  const cardapio = cardapios.find((c) => c.id === cardapioSelecionado)

  function handleAdicionar(e: React.FormEvent) {
    e.preventDefault()
    if (!cardapio) return

    adicionarItemCardapio(cardapio.id, {
      nome: form.nome,
      descricao: form.descricao,
      preco: parseFloat(form.preco),
      categoria: form.categoria,
      imagem: form.imagem || baiaoImg,
    })

    forceUpdate((n) => n + 1)
    setAdicionando(false)
    setForm({ nome: '', descricao: '', preco: '', categoria: 'Pratos', imagem: '' })
  }

  function handleRemover(item_id: string) {
    if (!cardapio) return
    removerItemCardapio(cardapio.id, item_id)
    forceUpdate((n) => n + 1)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-semibold text-gray-700">Cardapios</h2>
        <div className="flex gap-2 items-center">
          <select
            value={cardapioSelecionado}
            onChange={(e) => setCardapioSelecionado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          >
            {cardapios.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
          <Button size="sm" onClick={() => setAdicionando(!adicionando)}>
            {adicionando ? 'Cancelar' : '+ Item'}
          </Button>
        </div>
      </div>

      {adicionando && (
        <form onSubmit={handleAdicionar} className="bg-amber-50 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nome do prato"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <Input
            label="Preco (R$)"
            type="number"
            step="0.01"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            >
              {['Pratos', 'Lanches', 'Caldos', 'Bebidas', 'Sobremesas'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <Input
            label="URL da imagem (opcional)"
            value={form.imagem}
            onChange={(e) => setForm({ ...form, imagem: e.target.value })}
            placeholder="https://..."
          />
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" size="sm">Salvar item</Button>
          </div>
        </form>
      )}

      {cardapio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cardapio.itens.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.nome}</p>
                <p className="text-xs text-gray-500">{item.categoria} · R$ {item.preco.toFixed(2)}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRemover(item.id)}
                className="text-red-500 border-red-200 flex-shrink-0"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
