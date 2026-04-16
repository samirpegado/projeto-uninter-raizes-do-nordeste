export type NivelFidelidade = 'Bronze' | 'Prata' | 'Ouro'

export interface Fidelidade {
  usuario_id: string
  pontos: number
  nivel: NivelFidelidade
}

export const fidelidade: Fidelidade[] = [
  {
    usuario_id: 'u-001',
    pontos: 150,
    nivel: 'Bronze',
  },
  {
    usuario_id: 'u-003',
    pontos: 45,
    nivel: 'Bronze',
  },
]

export function calcularNivel(pontos: number): NivelFidelidade {
  if (pontos >= 500) return 'Ouro'
  if (pontos >= 200) return 'Prata'
  return 'Bronze'
}
