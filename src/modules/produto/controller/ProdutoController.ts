import { Request, Response } from 'express'
import ShowAllProdutosService from '../services/ShowAllProdutosService'

export default class ProdutoController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const showAllProdutosService = new ShowAllProdutosService()

    const empresas = await showAllProdutosService.execute(tenantId)

    return res.json(empresas)
  }
}
