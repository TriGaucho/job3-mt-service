import { Request, Response } from 'express'
import ShowAllPessoaService from '../services/ShowAllPessoaService'
import FindClienteService from '../services/FindClienteService'

export default class PessoaController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const showAllPessoaService = new ShowAllPessoaService()

    const pessoas = await showAllPessoaService.execute(tenantId)

    return res.json(pessoas)
  }

  public async findCliente(req: Request, res: Response): Promise<Response> {
    const { tenantId, cliente } = req.params
    const findClienteService = new FindClienteService()

    const dadosCliente = await findClienteService.execute({tenantId, cpfCnpj: cliente} )

    return res.json(dadosCliente)
  }

  //TODO cadastra pessoa
}
