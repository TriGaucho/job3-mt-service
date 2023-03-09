import DocumentoRepository from "@modules/pedido/repositories/DocumentoRepository";
import AppError from "@shared/erros/AppError";


class UpdatePedidoService {
  public async execute(tenantId: string, idPedido: number[], update: object,): Promise<number> {
    const pedidoRepository = new DocumentoRepository()

    const pedido = pedidoRepository.update(tenantId, idPedido, update)

    if(!pedido) new AppError(`Não foi possível atualizar o(s) pedido(s) ${idPedido}`)

    return pedido
  }
}

export default UpdatePedidoService
