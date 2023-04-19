import { Request, Response } from 'express'
import ConsultaConfiguracoesService from '../services/ConsultaConfiguracoesService'
import config from '@config/config'
import { ambiente, ecosystem, portaApi } from '@shared/consts/ambiente'

export default class ConfiguracoesController {
  public async show(req: Request, res: Response): Promise<Response> {

    const consultaConfiguracoesService = new ConsultaConfiguracoesService()
    const dados = await consultaConfiguracoesService.execute()

    const versaoBackend = config.versao
    return res.json({dados, versaoBackend, ambiente, portaApi, ecosystem})
  }
}
