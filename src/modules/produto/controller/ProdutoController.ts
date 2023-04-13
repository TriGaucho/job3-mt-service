import { Request, Response } from 'express'
import ShowAllProdutosService from '../services/ShowAllProdutosService'
import ProdutosPorTabelaService from '../services/ProdutosPorTabelaService'
import ProdutosPorFiltroService from '../services/ProdutosPorFiltroService'

export default class ProdutoController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const showAllProdutosService = new ShowAllProdutosService()

    const produtos = await showAllProdutosService.execute(tenantId)

    return res.json(produtos)
  }

  public async produtosPorFiltro(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const { query } = req
    const produtosPorFiltroService = new ProdutosPorFiltroService()

    const produtos = await produtosPorFiltroService.execute(tenantId, {...query})

    return res.json(produtos)
  }

  public async produtosPorTabela(req: Request, res: Response): Promise<Response> {
    const { tenantId, tabela} = req.params
    const produtosPorTabelaService = new ProdutosPorTabelaService()

    const produtos = await produtosPorTabelaService.execute(tenantId, tabela)

    return res.json(produtos)
  }
}
