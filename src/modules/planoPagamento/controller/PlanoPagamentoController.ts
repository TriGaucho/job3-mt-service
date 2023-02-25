import { Request, Response } from 'express'
import ShowAllPlanosPagamentoService from '../services/ShowAllPlanosPagamentoService'

export default class PlanoPagamentoController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const showAllPlanosPagamentoService = new ShowAllPlanosPagamentoService()

    const produtos = await showAllPlanosPagamentoService.execute(tenantId)

    return res.json(produtos)
  }
}
