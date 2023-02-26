import AppError from '@shared/erros/AppError'
import InsereTenantId from '@shared/utils/insereTenantId'
import LegadoJob3Repository from '../repositories/LegadoJob3Repository'

import PlanoPagamento from '@modules/planoPagamento/entities/PlanoPagamento'
import PlanoPagamentoRepository from '@modules/planoPagamento/repositories/PlanoPagamentoRepository'

class ImportaPlanosPagamentoService {
  public async execute(planosPagamentoArray:PlanoPagamento[], tenantId: string): Promise<number> {
    await InsereTenantId(planosPagamentoArray, tenantId)

    const legadoJob3Repository = new LegadoJob3Repository()
    const planoPagamentoRepository = new PlanoPagamentoRepository()

    await planoPagamentoRepository.deleteAll(tenantId)

    const planosPagamento = legadoJob3Repository.createOrUpdate(planosPagamentoArray, 'planoPagamento')

    if (!planosPagamento) throw new AppError('Não foi possível importar os usuários.')

    return planosPagamento
  }
}

export default ImportaPlanosPagamentoService
