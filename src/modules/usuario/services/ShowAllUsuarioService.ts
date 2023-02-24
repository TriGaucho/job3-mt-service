import AppError from '@shared/erros/AppError'
import Usuario from '../entities/Usuario'
import UsuarioRepository from '../repositories/UsuarioRepository'

class ShowAllUsuarioService {
  public async execute(tenantId: string): Promise<Usuario[]> {
    const usuarioRepository = new UsuarioRepository()

    const usuarios = await usuarioRepository.showAll(tenantId)

    if (!usuarios) throw new AppError('Não foi possível cadastrar o usuário.')

    return usuarios
  }
}

export default ShowAllUsuarioService
