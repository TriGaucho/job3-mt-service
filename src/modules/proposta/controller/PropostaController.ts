import { Request, Response } from 'express'
import CreatePropostaService from '../services/CreatePropostaService'
import GetPropostasService from '../services/GetPropostasService'
export default class PropostaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPropostaService = new CreatePropostaService()

    const { dadosProposta, produtosProposta, dadosCliente } = req.body
    const { tenantId } = req.params
    const { docUsuario } = req.usuario

    const proposta = await createPropostaService.execute(dadosProposta, produtosProposta, dadosCliente, tenantId, docUsuario)

    return res.json(proposta)
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const getPropostasService = new GetPropostasService()
    const { tenantId } = req.params
    const { idUsuario } = req.usuario

    const proposta = await getPropostasService.execute(tenantId, idUsuario, true)

    return res.json(proposta)
  }
}
