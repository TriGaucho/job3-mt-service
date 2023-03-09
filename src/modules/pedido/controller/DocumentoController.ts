import { Request, Response } from 'express'
import CreateDocumentoService from '../services/CreateDocumentoService'
import ProximoNumeroService from '../services/ProximoNumeroService'

export default class DocumentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { dadosDocumento, produtosDocumento, dadosCliente } = req.body
    const { tenantId } = req.params

    const createDocumentoService = new CreateDocumentoService()
    const documento = await createDocumentoService.execute(dadosDocumento, produtosDocumento, dadosCliente, tenantId)

    return res.json(documento)
  }

  public async proximoNumeroDocumento(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const proximoNumeroService = new ProximoNumeroService()
    const documento = await proximoNumeroService.execute(tenantId)

    return res.json(documento)
  }

  //TODO cabeçalho
  //TODO detalhesPedido
  //TODO atualiza status pedido
}
