import { Request, Response } from 'express'
import CreateDocumentoService from '../services/CreateDocumentoService'
import ProximoNumeroService from '../services/ProximoNumeroService'
import ShowHeadersDocumentosService from '../services/ShowHeadersDocumentosService'
import FindOneDocumentoService from '../services/FindOneDocumentoService'
import ShowAllDocumentosService from '../services/ShowAllDocumentosService'

export default class DocumentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { dadosDocumento, produtosDocumento, dadosCliente } = req.body
    const { tenantId } = req.params
    const { docUsuario } = req.usuario

    const createDocumentoService = new CreateDocumentoService()
    const documento = await createDocumentoService.execute(dadosDocumento, produtosDocumento, dadosCliente, tenantId, docUsuario)

    return res.json(documento)
  }

  public async proximoNumeroDocumento(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const proximoNumeroService = new ProximoNumeroService()
    const documento = await proximoNumeroService.execute(tenantId)

    return res.json(documento)
  }

  public async headersDocumentos(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params
    const { idUsuario } = req.usuario

    // const showHeadersDocumentosService = new ShowHeadersDocumentosService()
    // const documentos = await showHeadersDocumentosService.execute(tenantId, idUsuario)
    const showAllDocumentosService = new ShowAllDocumentosService()
    const documentos = await showAllDocumentosService.executeAll(tenantId, idUsuario)

    return res.json(documentos)
  }

  public async detalhesDocumento(req: Request, res: Response): Promise<Response> {
    const { tenantId, idDocumento } = req.params

    const findOneDocumentoService = new FindOneDocumentoService()
    const documentos = await findOneDocumentoService.execute(tenantId, parseInt(idDocumento))

    return res.json(documentos)
  }

  //TODO atualiza status pedido
}
