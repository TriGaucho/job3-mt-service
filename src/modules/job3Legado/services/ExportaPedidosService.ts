import Documento from "@modules/pedido/entities/DocumentoExport";
import ShowAllDocumentosService from '@modules/pedido/services/ShowAllDocumentosService'

class ExportaPedidosService {
  public async execute (tenantId: string): Promise<Documento[]> {
    const showAllPedidosService = new ShowAllDocumentosService()

    const pedidos = showAllPedidosService.execute(tenantId, false)

    return pedidos
  }
}

export default ExportaPedidosService
