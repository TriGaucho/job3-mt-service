import { Request, Response } from 'express'
import CreateSessionService from '../services/CreateSessionService'

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { usuario, senha, ambiente } = req.body

    const createUsuario = new CreateSessionService()
    const sessao = await createUsuario.execute(usuario, senha.toUpperCase(), ambiente.toUpperCase())

    return res.json(sessao)
  }
}
