import bcrypt from 'bcryptjs'
import Usuario from "@modules/usuario/entities/Usuario"

export default async function HashSenha (usuario: Usuario[]): Promise<any> {
  const salt = await bcrypt.genSaltSync(10)
  return usuario.map((u) => {
    u.senha = bcrypt.hashSync(u.senha, salt)
    return u
  }
  )
}
