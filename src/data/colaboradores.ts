export type FuncaoColaborador = 'Gerente' | 'Atendente' | 'Garcom'

export interface Colaborador {
  id: string
  nome: string
  email: string
  telefone: string
  funcao: FuncaoColaborador
  loja_id: string
}

export let colaboradores: Colaborador[] = [
  {
    id: 'col-001',
    nome: 'Ana Souza',
    email: 'ana@raizes.com',
    telefone: '84999990010',
    funcao: 'Gerente',
    loja_id: 'l-001',
  },
  {
    id: 'col-002',
    nome: 'Joao Ferreira',
    email: 'joao@raizes.com',
    telefone: '84999990011',
    funcao: 'Atendente',
    loja_id: 'l-001',
  },
  {
    id: 'col-003',
    nome: 'Lucia Melo',
    email: 'lucia@raizes.com',
    telefone: '85999990012',
    funcao: 'Garcom',
    loja_id: 'l-002',
  },
]
