import AppError from "@shared/erros/AppError";
import PedidoRepository from "../repositories/PedidoRepository";

class UpdatePedidoService {
  public async execute(tenantId: string, idPedidos: number[], filtro: object, ): Promise<number> {
    const pedidoRepository = new PedidoRepository()

    const pedido = pedidoRepository.update(tenantId, idPedidos, filtro)

    if(!pedido) new AppError(`Não foi possível atualizar o(s) pedido(s) ${filtro}`)

    return pedido
  }
}

export default UpdatePedidoService
