import { Request, Response } from 'express'
import CreatePedidoService from '../services/CreatePedidoService'
import ProximoNumeroService from '../services/ProximoNumeroService'

export default class PedidoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { dadosPedido, produtosPedido, dadosCliente } = req.body
    const { tenantId } = req.params

    const createPedidoService = new CreatePedidoService()
    const pedido = await createPedidoService.execute(dadosPedido, produtosPedido, dadosCliente, tenantId)

    return res.json(pedido)
  }

  public async proximoNumeroPedido(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const proximoNumeroService = new ProximoNumeroService()
    const pedido = await proximoNumeroService.execute(tenantId)

    return res.json(pedido)
  }

  //TODO cabeçalho
  //TODO detalhesPedido
  //TODO atualiza status pedido
}
