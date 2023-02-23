import { Request, Response } from 'express'
import ImportaProdutosService from '../services/ImportaProdutosService'

export default class Job3LegadoController {
  public async createorUpdate(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaProdutosService = new ImportaProdutosService()
    const produtos = await importaProdutosService.execute(body, tenantId)

    return res.json(produtos)
  }
}
