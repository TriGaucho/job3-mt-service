import AppError from '@shared/erros/AppError'
import InsereTenantId from '@shared/utils/insereTenantId'
import LegadoJob3Repository from '../repositories/LegadoJob3Repository'

import Usuario from '@modules/usuario/entities/Usuario'
import HashSenha from '@shared/utils/HashSenha'
import { usuario } from '@shared/consts/banco'

class ImportaUsuariosService {
  public async execute(usuariosArray:Usuario[], tenantId: string): Promise<number> {
    await InsereTenantId(usuariosArray, tenantId)

    await HashSenha(usuariosArray)

    const legadoJob3Repository = new LegadoJob3Repository()

    const usuarios = legadoJob3Repository.inativaCriaOuAtualiza(usuariosArray, usuario, tenantId)

    if (!usuarios) throw new AppError('Não foi possível importar os usuários.')

    return usuarios
  }
}

export default ImportaUsuariosService
