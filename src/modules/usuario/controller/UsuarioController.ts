import { Request, Response } from 'express'
import CreateUsuarioService from '../services/CreateUsuarioService'
import ShowAllUsuarioService from '../services/ShowAllUsuarioService'


export default class UsuarioController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const createUsuario = new CreateUsuarioService()
    const usuario = await createUsuario.execute(body, tenantId)

    return res.json(usuario)
  }

  public async showAll(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const showAllUsuarioService = new ShowAllUsuarioService()
    const usuario = await showAllUsuarioService.execute(tenantId)

    return res.json(usuario)
  }
}
