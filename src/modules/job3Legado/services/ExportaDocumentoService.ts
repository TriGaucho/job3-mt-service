import Documento from "@modules/pedido/entities/DocumentoExport";
import ShowAllDocumentosService from '@modules/pedido/services/ShowAllDocumentosService'

class ExportaDocumentoService {
  public async execute (tenantId: string): Promise<Documento[]> {
    const showAllDocumentosService = new ShowAllDocumentosService()

    const documentos = showAllDocumentosService.execute(tenantId, false)

    return documentos
  }
}

export default ExportaDocumentoService
