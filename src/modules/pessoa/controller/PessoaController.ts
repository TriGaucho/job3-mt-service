import { Request, Response } from 'express'
import ShowAllPessoaService from '../services/ShowAllPessoaService'

export default class PessoaController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const showAllPessoaService = new ShowAllPessoaService()

    const pessoas = await showAllPessoaService.execute(tenantId)

    return res.json(pessoas)
  }

  //TODO cadastra pessoa
}
