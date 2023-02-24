import { Request, Response } from 'express'
import ImportaProdutosService from '../services/ImportaProdutosService'
import ImportaPessoasService from '../services/ImportaPessoasService'
import ImportaUsuariosService from '../services/ImportaUsuariosService'

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

    const importaPessoasService = new ImportaPessoasService()
    const pessoas = await importaPessoasService.execute(body, tenantId)

    return res.json(pessoas)
  }

  public async importUsuarios(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaUsuariosService = new ImportaUsuariosService()
    const usuarios = await importaUsuariosService.execute(body, tenantId)

    return res.json(usuarios)
  }
}
