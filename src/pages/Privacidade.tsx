import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function Privacidade() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          ← Voltar
        </Button>

        <h1 className="text-2xl font-bold text-amber-800 mb-6">Politica de Privacidade</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 prose prose-sm max-w-none text-gray-700">
          <h2 className="text-lg font-semibold mb-2">1. Coleta de dados</h2>
          <p className="mb-4">
            coletamos apenas os dados necessarios para o funcionamento do servico: nome, email, telefone e historico de pedidos.
            nao compartilhamos seus dados com terceiros sem seu consentimento.
          </p>

          <h2 className="text-lg font-semibold mb-2">2. Uso dos dados</h2>
          <p className="mb-4">
            seus dados sao usados para identificacao, processamento de pedidos e programa de fidelidade.
            voce pode solicitar a exclusao da sua conta a qualquer momento.
          </p>

          <h2 className="text-lg font-semibold mb-2">3. Cookies</h2>
          <p className="mb-4">
            usamos cookies para manter sua sessao ativa e melhorar a experiencia de navegacao.
            voce pode desativar cookies nas configuracoes do seu navegador.
          </p>

          <h2 className="text-lg font-semibold mb-2">4. Seus direitos (LGPD)</h2>
          <p className="mb-4">
            de acordo com a Lei Geral de Protecao de Dados (Lei 13.709/2018), voce tem direito a:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>acessar seus dados pessoais</li>
            <li>corrigir dados incompletos ou incorretos</li>
            <li>solicitar a exclusao dos seus dados</li>
            <li>revogar o consentimento a qualquer momento</li>
          </ul>

          <h2 className="text-lg font-semibold mb-2">5. Contato</h2>
          <p>
            para exercer seus direitos ou tirar duvidas, entre em contato pelo email:{' '}
            <span className="text-amber-700">privacidade@raizesdonordeste.com.br</span>
          </p>
        </div>
      </div>
    </div>
  )
}
