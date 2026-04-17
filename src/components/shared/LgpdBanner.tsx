import { useState, useEffect } from 'react'

export function LgpdBanner() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aceito = localStorage.getItem('lgpd_aceito')
    if (!aceito) setVisivel(true)
  }, [])

  function aceitar() {
    localStorage.setItem('lgpd_aceito', 'true')
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-300">
          usamos cookies e dados para melhorar sua experiencia. ao continuar, voce concorda com nossa{' '}
          <a href="/privacidade" className="underline text-amber-400 hover:text-amber-300">
            politica de privacidade
          </a>
          .
        </p>
        <button
          onClick={aceitar}
          className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-2 rounded whitespace-nowrap transition-colors"
        >
          Entendi e aceito
        </button>
      </div>
    </div>
  )
}
