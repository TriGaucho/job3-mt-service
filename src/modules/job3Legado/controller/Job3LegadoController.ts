import { Request, Response } from 'express'
import ImportaProdutosService from '../services/ImportaProdutosService'
import ImportaPessoasService from '../services/ImportaPessoasService'
import ImportaUsuariosService from '../services/ImportaUsuariosService'
import ImportaPlanosPagamentoService from '../services/ImportaPlanosPagamentoService'
import ExportaPedidosService from '../services/ExportaPedidosService'
import UpdatePedidoService from '../services/UpdatePedidoService'

export default class Job3LegadoController {
  public async importProdutos(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaProdutosService = new ImportaProdutosService()
    const produtos = await importaProdutosService.execute(body, tenantId)

    return res.json(produtos)
  }

  public async importPessoas(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaPessoasService = new ImportaPessoasService()
    const pessoas = await importaPessoasService.execute(body, tenantId)

    return res.json(pessoas)
  }

  public async importUsuarios(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaUsuariosService = new ImportaUsuariosService()
    const usuarios = await importaUsuariosService.execute(body, tenantId)

    return res.json(usuarios)
  }

  public async importPlanosPagamento(req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { tenantId } = req.params

    const importaPlanosPagamentoService = new ImportaPlanosPagamentoService()
    const planosPagamento = await importaPlanosPagamentoService.execute(body, tenantId)

    return res.json(planosPagamento)
  }

  public async exportaPedidos(req: Request, res: Response): Promise<Response> {
    const { tenantId } = req.params

    const exportaPedidosService = new ExportaPedidosService()
    const pedidos = await exportaPedidosService.execute(tenantId)

    return res.json(pedidos)
  }

  public async updatePedido(req: Request, res: Response): Promise<Response> {
    const { tenantId, importado } = req.params
    const { pedidos } = req.body

    const updatePedidoService = new UpdatePedidoService()
    const updatePedido = await updatePedidoService.execute(tenantId, pedidos, { importado })

    return res.json(updatePedido)
  }
}
