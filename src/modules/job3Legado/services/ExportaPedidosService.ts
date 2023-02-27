import Pedido from "@modules/pedido/entities/PedidoExport";
import ShowAllPedidosService from '@modules/pedido/services/ShowAllPedidosService'

class ExportaPedidosService {
  public async execute (tenantId: string): Promise<Pedido[]> {
    const showAllPedidosService = new ShowAllPedidosService()

    const pedidos = showAllPedidosService.execute(tenantId, false)

    return pedidos
  }
}

export default ExportaPedidosService
