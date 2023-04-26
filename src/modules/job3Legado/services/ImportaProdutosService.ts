import AppError from '@shared/erros/AppError'
import InsereTenantId from '@shared/utils/insereTenantId'
import LegadoJob3Repository from '../repositories/LegadoJob3Repository'

import Produto from '@modules/produto/entities/Produto'
import { produto } from '@shared/consts/banco'

class ImportaProdutosService {
  public async execute(produtosArray:Produto[], tenantId: string): Promise<number> {
    await InsereTenantId(produtosArray, tenantId)

    const legadoJob3Repository = new LegadoJob3Repository()

    const produtos = legadoJob3Repository.inativaCriaOuAtualiza(produtosArray, produto, tenantId)

    if (!produtos) throw new AppError('Não foi possível importar os produtos.')

    return produtos
  }
}

export default ImportaProdutosService
