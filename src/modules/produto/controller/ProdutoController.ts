import { Request, Response } from 'express'
import ShowAllProdutosService from '../services/ShowAllProdutosService'
import ProdutosPorTabelaService from '../services/ProdutosPorTabelaService'

export default class ProdutoController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const showAllProdutosService = new ShowAllProdutosService()

    const produtos = await showAllProdutosService.execute(tenantId)

    return res.json(produtos)
  }
  public async produtosPorTabela(req: Request, res: Response): Promise<Response> {
    const { tenantId, tabela} = req.params
    const produtosPorTabelaService = new ProdutosPorTabelaService()

    const produtos = await produtosPorTabelaService.execute(tenantId, tabela)

    return res.json(produtos)
  }
}
