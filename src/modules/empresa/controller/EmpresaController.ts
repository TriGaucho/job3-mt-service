import { Request, Response } from 'express'
import CreateEmpresaService from '../services/CreateEmpresaService'
import ShowEmpresaService from '../services/ShowEmpresaService'
import ShowAllEmpresaService from '../services/ShowAllEmpresaService'

export default class ProdutoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req

    const createEmpresa = new CreateEmpresaService()
    const empresa = await createEmpresa.execute(body)

    return res.json(empresa)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { idEmpresa } = req.params

    const showEmpresaService = new ShowEmpresaService()
    const empresa = await showEmpresaService.execute(idEmpresa)

    return res.json(empresa)
  }

  public async showAll(req: Request, res: Response): Promise<Response> {
    const showAllEmpresaService = new ShowAllEmpresaService()
    const empresas = await showAllEmpresaService.execute()

    return res.json(empresas)
  }
}
