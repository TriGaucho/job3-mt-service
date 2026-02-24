import { Request, Response } from 'express'
import VencimentoSenhasService from '../services/VencimentoSenhasService'

export default class VencimentoSenhasController {
  public async cadastrarOuAtualizar(req: Request, res: Response): Promise<Response> {

    const { body } = req

    const vencimentoSenhasService = new VencimentoSenhasService()
    const dadosBD = await vencimentoSenhasService.createClienteDocumentoService(body)

    return res.json(dadosBD)
  }

  public async consultarVecimentoSenhas(req: Request, res: Response): Promise<Response> {
    const cnpj = req.query.cnpj as string
    const vencimentoSenhasService = new VencimentoSenhasService()
    const dadosBD = await vencimentoSenhasService.consultarVencimentoSenhas(cnpj)

    return res.json(dadosBD)
  }
}
