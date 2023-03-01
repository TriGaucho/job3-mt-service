import CreateClienteService from '@modules/pessoa/services/CreateClienteService'
import AppError from '@shared/erros/AppError'
import Pedido from '../entities/Pedido'
import ProdutosPedido from '../entities/ProdutosPedido'
import PedidoRepository from '../repositories/PedidoRepository'

interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class CreatePedidoService {
  public async execute(dadosPedido: Pedido, produtosPedido: ProdutosPedido[], dadosCliente: iCliente, tenantId: string): Promise<number> {

    if (dadosCliente) {
      //cadastrar o cliente
      const { telefone, cep, logradouro, bairro, cidade, uf } = dadosPedido

      const cliente = { ...dadosCliente, telefone, cep, logradouro, bairro, cidade, uf }

      const createClienteService = new CreateClienteService()

      const idCliente = await createClienteService.execute(tenantId, cliente)

      if (!idCliente) throw new AppError('Não foi possível cadastrar o cliente do pedido.')

      dadosPedido.cliente = idCliente
    }

    const pedidoRepository = new PedidoRepository()

    const idPedido = await pedidoRepository.createPedido({ ...dadosPedido, tenantId })

    if (!idPedido) throw new AppError('Não foi possível criar o pedido.')

    const produtosDoPedido = await this.insertIdPedidoProdutos(idPedido, tenantId, produtosPedido)
    const produtos = await pedidoRepository.createProdutosPedido(produtosDoPedido, idPedido)

    if (!produtos) throw new AppError(`Não foi possível adastrar os produtos do pedido ${idPedido}.`)

    return idPedido

  }

  async insertIdPedidoProdutos(idPedido: number, tenantId: string, produtos: ProdutosPedido[]): Promise<ProdutosPedido[]> {
    await produtos.forEach((produto: ProdutosPedido) => {
      produto.idPedido = idPedido
      produto.tenantId = tenantId
    })
    return produtos
  }
}

export default CreatePedidoService
