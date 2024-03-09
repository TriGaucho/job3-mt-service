import { Request, Response } from 'express'
import CreatePropostaService from '../services/CreatePropostaService'

export default class PropostaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPropostaService = new CreatePropostaService()

    const { dadosProposta, produtosProposta } = req.body
    const { tenantId } = req.params

    const proposta = await createPropostaService.execute(dadosProposta, produtosProposta, tenantId)

    return res.json(proposta)
  }
}
