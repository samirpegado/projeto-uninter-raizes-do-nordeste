export interface Usuario {
  id: string
  nome: string
  email: string
  senha: string
  tipo: 'cliente' | 'admin'
  telefone: string
  loja_id: string
  pontos: number
  aceitou_lgpd: boolean
}

export const usuarios: Usuario[] = [
  {
    id: 'u-001',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    senha: '123456', // nao e producao, pode deixar assim
    tipo: 'cliente',
    telefone: '84999990001',
    loja_id: 'l-001',
    pontos: 120,
    aceitou_lgpd: true,
  },
  {
    id: 'u-002',
    nome: 'Carlos Admin',
    email: 'admin@raizes.com',
    senha: 'admin123',
    tipo: 'admin',
    telefone: '84999990002',
    loja_id: 'l-001',
    pontos: 0,
    aceitou_lgpd: true,
  },
  {
    id: 'u-003',
    nome: 'Pedro Alves',
    email: 'pedro@email.com',
    senha: '123456',
    tipo: 'cliente',
    telefone: '85999990003',
    loja_id: 'l-002',
    pontos: 45,
    aceitou_lgpd: true,
  },
]
