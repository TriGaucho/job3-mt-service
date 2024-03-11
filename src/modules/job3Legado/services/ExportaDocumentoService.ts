import Documento from "@modules/pedido/entities/DocumentoExport";
import ShowAllDocumentosService from '@modules/pedido/services/ShowAllDocumentosService'
import PropostasParaExportacao from "@modules/proposta/entities/PropostasParaExportacao";
import ExpotacaoPropostasService from "@modules/proposta/services/ExpotacaoPropostasService";

class ExportaDocumentoService {
  public async execute (tenantId: string): Promise<Documento[]> {
    const showAllDocumentosService = new ShowAllDocumentosService()

    const documentos = showAllDocumentosService.execute(tenantId, false)

    return documentos
  }

  public async exportacaoPropostas (tenantId: string): Promise<PropostasParaExportacao[]> {
    const expotacaoPropostasService = new ExpotacaoPropostasService()

    const documentos = expotacaoPropostasService.execute(tenantId, false)

    return documentos
  }
}

export default ExportaDocumentoService
