import AppError from '@shared/erros/AppError'
import InsereTenantId from '@shared/utils/insereTenantId'
import LegadoJob3Repository from '../repositories/LegadoJob3Repository'

import Usuario from '@modules/usuario/entities/Usuario'

class ImportaUsuariosService {
  public async execute(usuariosArray:Usuario[], tenantId: string): Promise<number> {
    await InsereTenantId(usuariosArray, tenantId)

    const legadoJob3Repository = new LegadoJob3Repository()

    const usuarios = legadoJob3Repository.createOrUpdate(usuariosArray, 'usuario')

    if (!usuarios) throw new AppError('Não foi possível importar os usuários.')

    return usuarios
  }
}

export default ImportaUsuariosService
