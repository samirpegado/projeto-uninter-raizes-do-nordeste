import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, cadastrar } from '../../services/authService'
import { useAuth } from '../../store/AuthContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function Login() {
  const { setUsuario } = useAuth()
  const navigate = useNavigate()

  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [aceitouLgpd, setAceitouLgpd] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    // simula um delay de rede
    setTimeout(() => {
      const usuario = login(email, senha)
      setLoading(false)

      if (!usuario) {
        setErro('email ou senha incorretos')
        return
      }

      setUsuario(usuario)

      if (usuario.tipo === 'admin') {
        navigate('/admin')
      } else {
        navigate('/lojas')
      }
    }, 500)
  }

  function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (!aceitouLgpd) {
      setErro('voce precisa aceitar os termos para continuar')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const usuario = cadastrar({
        nome,
        email,
        senha,
        telefone,
        tipo: 'cliente',
        loja_id: '',
        aceitou_lgpd: true,
      })

      setLoading(false)

      if (!usuario) {
        setErro('esse email ja esta em uso')
        return
      }

      setUsuario(usuario)
      navigate('/lojas')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-800 flex items-center justify-center gap-2">
            <img src="/favicon.png" alt="" className="w-8 h-8" />
            Raizes do Nordeste
          </h1>
           <h2 className="text-lg font-bold text-amber-400 mt-4">O sabor da comida de mainha</h2>
          <p className="text-gray-500 text-sm mt-1">
            {modo === 'login' ? 'entre na sua conta' : 'crie sua conta'}
          </p>
        </div>

        <div className="flex mb-6 border rounded overflow-hidden">
          <button
            onClick={() => { setModo('login'); setErro('') }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              modo === 'login' ? 'bg-amber-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setModo('cadastro'); setErro('') }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              modo === 'cadastro' ? 'bg-amber-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {modo === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <Input
              id="senha"
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              required
            />

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
              Entrar
            </Button>

            <p className="text-xs text-gray-400 text-center mt-2">
              teste: maria@email.com / 123456 &nbsp;|&nbsp; admin@raizes.com / admin123
            </p>
          </form>
        ) : (
          <form onSubmit={handleCadastro} className="flex flex-col gap-4">
            <Input
              id="nome"
              label="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Maria Silva"
              required
            />
            <Input
              id="email-cad"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <Input
              id="telefone"
              label="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="84999990000"
            />
            <Input
              id="senha-cad"
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              required
            />

            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={aceitouLgpd}
                onChange={(e) => setAceitouLgpd(e.target.checked)}
                className="mt-0.5 accent-amber-700"
              />
              <span>
                li e aceito os{' '}
                <Link to="/privacidade" className="text-amber-700 underline">
                  termos de uso e politica de privacidade
                </Link>
              </span>
            </label>

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <Button
              type="submit"
              loading={loading}
              disabled={!aceitouLgpd}
              size="lg"
              className="w-full mt-2"
            >
              Criar conta
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
