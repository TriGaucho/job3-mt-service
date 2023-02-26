import { Request, Response } from 'express'
import CreatePedidoService from '../services/CreatePedidoService'

export default class PedidoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { dadosPedido, produtosPedido } = req.body
    const { tenantId } = req.params

    const createPedidoService = new CreatePedidoService()
    const pedido = await createPedidoService.execute(dadosPedido, produtosPedido, tenantId)

    return res.json(pedido)
  }

  // proximoNumeroPedido
  // cabeçalho
  // detalhesPedido
}
