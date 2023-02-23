import AppError from '@shared/erros/AppError'
import Usuario from '../entities/Usuario'
import UsuarioRepository from '../repositories/UsuarioRepository'

class CreateUsuarioService {
  public async execute(usuario: Usuario, tenantId: string): Promise<number> {
    const usuarioRepository = new UsuarioRepository()

    const novoUsuario = await usuarioRepository.create({...usuario, tenantId})

    if (!novoUsuario) throw new AppError('Não foi possível cadastrar o usuário.')

    return novoUsuario
  }
}

export default CreateUsuarioService
