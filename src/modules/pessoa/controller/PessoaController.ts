import { Request, Response } from 'express'
import ShowAllPessoaService from '../services/ShowAllPessoaService'
import FindClienteService from '../services/FindClienteService'
import CreateClienteService from '../services/CreateClienteService'
import FindClientesPorVendedorService from '../services/FindClientesPorVendedorService'

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

  public async findClientesPorVendedor(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const { docUsuario } = req.usuario

    const findClientesPorVendedorService = new FindClientesPorVendedorService()

    const clientes = await findClientesPorVendedorService.execute(tenantId, docUsuario)

    return res.json(clientes)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const { dadosCliente, dadosEndereco } = req.body

    const createClienteService = new CreateClienteService()

    const idCliente = await createClienteService.execute(tenantId, dadosCliente, dadosEndereco)

    return res.json(idCliente)
  }

  //TODO cadastra pessoa
}
