import AppError from '@shared/erros/AppError'
import proximoNumeroPedido from "@shared/queries/proximoNumeroPedido"
import PedidoRepository from '../repositories/PedidoRepository'

class ProximoNumeroService {
  public async execute(tenantId: string): Promise<any> {
    const sqlProximoNumero = `${proximoNumeroPedido.proximoNumero} where tenantId = ${tenantId}`

    const pedidoRepository = new PedidoRepository()

    const proximoNumero = await pedidoRepository.proximoNumero(sqlProximoNumero)

    if (!proximoNumero) throw new AppError('Não foi possível obter o número do pedido.')

    return proximoNumero
  }
}

export default ProximoNumeroService
