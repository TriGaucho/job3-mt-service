import { Request, Response } from 'express'
import ConsultaConfiguracoesService from '../services/ConsultaConfiguracoesService'


export default class ConfiguracoesController {
  public async show(req: Request, res: Response): Promise<Response> {

    const consultaConfiguracoesService = new ConsultaConfiguracoesService()
    const dados = await consultaConfiguracoesService.execute()

    return res.json(dados)
  }
}
