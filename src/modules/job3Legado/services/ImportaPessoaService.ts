import AppError from '@shared/erros/AppError'
import InsereTenantId from '@shared/utils/insereTenantId'
import Pessoa from '../../pessoa/entities/Pessoa'
import LegadoJob3Repository from '../repositories/LegadoJob3Repository'

class ImportaPessoasService {
  public async execute(pessoasArray:Pessoa[], tenantId: string): Promise<number> {
    await InsereTenantId(pessoasArray, tenantId)

    const legadoJob3Repository = new LegadoJob3Repository()

    const pessoas = legadoJob3Repository.createOrUpdate(pessoasArray, 'pessoa')

    if (!pessoas) throw new AppError('Não foi possível importar as pessoas.')

    return pessoas
  }
}

export default ImportaPessoasService
