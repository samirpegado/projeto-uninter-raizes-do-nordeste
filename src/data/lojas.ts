export interface Loja {
  id: string
  nome: string
  endereco: {
    rua: string
    numero: string
    cidade: string
    estado: string
  }
  cardapio_id: string
}

export const lojas: Loja[] = [
  {
    id: 'l-001',
    nome: 'Raizes do Nordeste - Natal',
    endereco: {
      rua: 'Rua das Dunas',
      numero: '210',
      cidade: 'Natal',
      estado: 'RN',
    },
    cardapio_id: 'c-001',
  },
  {
    id: 'l-002',
    nome: 'Raizes do Nordeste - Fortaleza',
    endereco: {
      rua: 'Av. Beira Mar',
      numero: '450',
      cidade: 'Fortaleza',
      estado: 'CE',
    },
    cardapio_id: 'c-002',
  },
  {
    id: 'l-003',
    nome: 'Raizes do Nordeste - Recife',
    endereco: {
      rua: 'Rua do Bom Jesus',
      numero: '88',
      cidade: 'Recife',
      estado: 'PE',
    },
    cardapio_id: 'c-001',
  },
]
