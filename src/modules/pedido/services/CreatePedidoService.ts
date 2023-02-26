import AppError from '@shared/erros/AppError'
import Pedido from '../entities/Pedido'
import ProdutosPedido from '../entities/ProdutosPedido'
import PedidoRepository from '../repositories/PedidoRepository'


class CreatePedidoService {
  public async execute(pedido: Pedido, produtosPedido: ProdutosPedido[], tenantId: string): Promise<number> {
    const pedidoRepository = new PedidoRepository()

    const idPedido = await pedidoRepository.createPedido({ ...pedido, tenantId })

    if (!idPedido) throw new AppError('Não foi possível criar o pedido.')

    const produtosDoPedido = await this.insertIdPedidoProdutos(idPedido, tenantId, produtosPedido)
    const produtos = await pedidoRepository.createProdutosPedido(produtosDoPedido, idPedido)

    if(!produtos) throw new AppError(`Não foi possível adastrar os produtos do pedido ${idPedido}.`)

    return idPedido
  }

  async insertIdPedidoProdutos (idPedido: number, tenantId: string, produtos: ProdutosPedido[]): Promise<ProdutosPedido[]> {
    await produtos.forEach((produto: ProdutosPedido)  => {
      produto.idPedido = idPedido
      produto.tenantId = tenantId
    })
    return produtos
  }
}

export default CreatePedidoService
