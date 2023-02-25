import AppError from "@shared/erros/AppError"
import PlanoPagamentoRepository from "../repositories/PlanoPagamentoRepository"
import PlanoPagamento from "../entities/PlanoPagamento"

class ShowAllPlanosPagamentoService {
  public async execute(tenantId: string): Promise<PlanoPagamento[]> {
    const planoPagamentoRepository = new PlanoPagamentoRepository()

    const planosPaGamento = await planoPagamentoRepository.showAll(tenantId)

    if (!planosPaGamento) throw new AppError('Nenhum plano de pagamento encontrada.')

    return planosPaGamento
  }
}

export default ShowAllPlanosPagamentoService
