import AppError from '@shared/erros/AppError'
import Usuario from '../entities/Usuario'
import UsuarioRepository from '../repositories/UsuarioRepository'
import InsereTenantId from '@shared/utils/insereTenantId'
import HashSenha from '@shared/utils/HashSenha'

class CreateUsuarioService {
  public async execute(usuario: Usuario[], tenantId: string): Promise<number> {
    const usuarioRepository = new UsuarioRepository()

    await HashSenha(usuario)

    await InsereTenantId(usuario, tenantId)

    const novoUsuario = await usuarioRepository.create(usuario)

    if (!novoUsuario) throw new AppError('Não foi possível cadastrar o usuário.')

    return novoUsuario
  }
}

export default CreateUsuarioService
