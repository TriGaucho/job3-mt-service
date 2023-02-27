import PedidoRepository from "@modules/pedido/repositories/PedidoRepository";
import AppError from "@shared/erros/AppError";


class UpdatePedidoService {
  public async execute(tenantId: string, idPedido: number[], update: object,): Promise<number> {
    const pedidoRepository = new PedidoRepository()

    const pedido = pedidoRepository.update(tenantId, idPedido, update)

    if(!pedido) new AppError(`Não foi possível atualizar o(s) pedido(s) ${idPedido}`)

    return pedido
  }
}

export default UpdatePedidoService
