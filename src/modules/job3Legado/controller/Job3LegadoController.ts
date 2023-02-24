import { Request, Response } from 'express'
import ImportaProdutosService from '../services/ImportaProdutosService'
import ImportaPessoaService from '../services/ImportaPessoaService'

export default class Job3LegadoController {
  public async importProdutos(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaProdutosService = new ImportaProdutosService()
    const produtos = await importaProdutosService.execute(body, tenantId)

    return res.json(produtos)
  }

  public async importPessoas(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaPessoaService = new ImportaPessoaService()
    const pessoas = await importaPessoaService.execute(body, tenantId)

    return res.json(pessoas)
  }
}
