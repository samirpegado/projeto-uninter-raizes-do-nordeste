import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { useCart } from '../../store/CartContext'

export function Header() {
  const { usuario, logout } = useAuth()
  const { itens } = useCart()
  const navigate = useNavigate()

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-amber-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <img src="/favicon.png" alt="" className="w-7 h-7" />
          Raizes do Nordeste
        </Link>

        <div className="flex items-center gap-4">
          {usuario ? (
            <>
              <span className="text-sm text-amber-200 hidden sm:block">
                Ola, {usuario.nome.split(' ')[0]}
              </span>

              {usuario.tipo === 'cliente' && (
                <>
                  <Link to="/menu" className="text-sm hover:text-amber-200 transition-colors">
                    Cardapio
                  </Link>
                  <Link to="/pedidos" className="text-sm hover:text-amber-200 transition-colors">
                    Meus Pedidos
                  </Link>
                  <Link to="/checkout" className="relative text-sm hover:text-amber-200 transition-colors">
                    🛒
                    {totalItens > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {totalItens}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {usuario.tipo === 'admin' && (
                <Link to="/admin" className="text-sm hover:text-amber-200 transition-colors">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-sm bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
