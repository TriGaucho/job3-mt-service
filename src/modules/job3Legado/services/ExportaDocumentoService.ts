import Documento from "@modules/pedido/entities/DocumentoExport";
import ShowAllDocumentosService from '@modules/pedido/services/ShowAllDocumentosService'
import PropostasParaExportacao from "@modules/proposta/entities/PropostasParaExportacao";
import GetPropostasService from "@modules/proposta/services/GetPropostasService";

class ExportaDocumentoService {
  public async execute (tenantId: string): Promise<any> {
    const showAllDocumentosService = new ShowAllDocumentosService()
    const expotacaoPropostasService = new GetPropostasService()

    const pedidos = await showAllDocumentosService.execute(tenantId, false)
    const propostas = await expotacaoPropostasService.execute(tenantId, 0, false)

    return { pedidos, propostas }
  }

  public async exportacaoPropostas (tenantId: string): Promise<PropostasParaExportacao[]> {
    const expotacaoPropostasService = new GetPropostasService()

    const documentos = expotacaoPropostasService.execute(tenantId, 0, false)

    return documentos
  }
}

export default ExportaDocumentoService
