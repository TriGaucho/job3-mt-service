import bcrypt from 'bcryptjs'

import AppError from '@shared/erros/AppError'
import Usuario from '../entities/Usuario'
import UsuarioRepository from '../repositories/UsuarioRepository'
import InsereTenantId from '@shared/utils/insereTenantId'

class CreateUsuarioService {
  public async execute(usuario: Usuario[], tenantId: string): Promise<number> {
    const usuarioRepository = new UsuarioRepository()

    await this.hasSenha(usuario)

    await InsereTenantId(usuario, tenantId)

    const novoUsuario = await usuarioRepository.create(usuario)

    if (!novoUsuario) throw new AppError('Não foi possível cadastrar o usuário.')

    return novoUsuario
  }

  async hasSenha (usuario: Usuario[]): Promise<any> {
    const salt = await bcrypt.genSaltSync(10)
    return usuario.map((u) => {
      u.senha = bcrypt.hashSync(u.senha, salt)
      return u
    }
    )
  }
}

export default CreateUsuarioService
