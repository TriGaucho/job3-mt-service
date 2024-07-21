import { Request, Response } from 'express'
import CreateSessionService from '../services/CreateSessionService'
import ValidaTokenService from '../services/ValidaTokenService'

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { usuario, senha, ambiente } = req.body

    const createSessionService = new CreateSessionService()
    const sessao = await createSessionService.execute(usuario, senha.toUpperCase(), ambiente.toUpperCase())

    return res.json(sessao)
  }

  public async validToken(req: Request, res: Response): Promise<Response> {
    const { headers } = req

    const validaTokenService = new ValidaTokenService()
    const sessao = await validaTokenService.execute(headers)

    return res.json(sessao)
  }

  public async modulos(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Logout realizado com sucesso' })
  }
}
