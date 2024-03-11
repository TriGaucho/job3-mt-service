import { Request, Response } from 'express'
import ImportaProdutosService from '../services/ImportaProdutosService'
import ImportaPessoasService from '../services/ImportaPessoasService'
import ImportaUsuariosService from '../services/ImportaUsuariosService'
import ImportaPlanosPagamentoService from '../services/ImportaPlanosPagamentoService'
import ExportaDocumentoService from '../services/ExportaDocumentoService'
import UpdateDocumentoService from '../services/UpdateDocumentoService'

export default class Job3LegadoController {
  public async importProdutos(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaProdutosService = new ImportaProdutosService()
    const produtos = await importaProdutosService.execute(body, tenantId)

    return res.json(produtos)
  }

  public async importPessoas(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaPessoasService = new ImportaPessoasService()
    const pessoas = await importaPessoasService.execute(body, tenantId)

    return res.json(pessoas)
  }

  public async importUsuarios(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaUsuariosService = new ImportaUsuariosService()
    const usuarios = await importaUsuariosService.execute(body, tenantId)

    return res.json(usuarios)
  }

  public async importPlanosPagamento(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaPlanosPagamentoService = new ImportaPlanosPagamentoService()
    const planosPagamento = await importaPlanosPagamentoService.execute(body, tenantId)

    return res.json(planosPagamento)
  }

  public async exportaDocumentos(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const exportaDocumentoService = new ExportaDocumentoService()
    const documentos = await exportaDocumentoService.execute(tenantId)

    return res.json(documentos)
  }

  public async exportacaoPropostas(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const exportaDocumentoService = new ExportaDocumentoService()
    const documentos = await exportaDocumentoService.exportacaoPropostas(tenantId)

    return res.json(documentos)
  }

  public async updateDocumento(req: Request, res: Response): Promise<Response> {
    const { tenantId, importado, idDocumento } = req.params

    const updateDocumentoService = new UpdateDocumentoService()
    const updateDocumento = await updateDocumentoService.setImportacaoPedido(tenantId, Number(idDocumento), Number(importado))

    return res.json(updateDocumento)
  }

  public async setImportacaoProposta(req: Request, res: Response): Promise<Response> {
    const { tenantId, importado, idProposta } = req.params

    const updateDocumentoService = new UpdateDocumentoService()
    const updateDocumento = await updateDocumentoService.setImportacaoProposta(tenantId, Number(idProposta), Number(importado))

    return res.json(updateDocumento)
  }
}
