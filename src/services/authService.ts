import { usuarios, type Usuario } from '../data/usuarios'

export function login(email: string, senha: string): Usuario | null {
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha)

  if (!usuario) return null

  return usuario
}

export function cadastrar(dados: Omit<Usuario, 'id' | 'pontos'>): Usuario | null {
  const jaExiste = usuarios.find((u) => u.email === dados.email)
  if (jaExiste) return null

  const novoUsuario: Usuario = {
    ...dados,
    id: `u-${Date.now()}`,
    pontos: 0,
  }

  usuarios.push(novoUsuario)

  return novoUsuario
}

export function excluirConta(usuario_id: string): boolean {
  const idx = usuarios.findIndex((u) => u.id === usuario_id)
  if (idx === -1) return false

  usuarios.splice(idx, 1)

  return true
}
