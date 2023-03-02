import CreateClienteService from '@modules/pessoa/services/CreateClienteService'
import AppError from '@shared/erros/AppError'
import Pedido from '../entities/Pedido'
import ProdutosPedido from '../entities/ProdutosPedido'
import PedidoRepository from '../repositories/PedidoRepository'
import ProximoNumeroService from './ProximoNumeroService'

interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class CreatePedidoService {
  public async execute(dadosPedido: Pedido, produtosPedido: ProdutosPedido[], dadosCliente: iCliente, tenantId: string): Promise<number> {
    const pedidoRepository = new PedidoRepository()

    if (dadosCliente) {
      dadosPedido.cliente = await this.createCliente(tenantId, dadosCliente, dadosPedido)
    }

    if (!dadosPedido.numeroPedido) {
      const proximoNumeroService = new ProximoNumeroService()
      const numero = await proximoNumeroService.execute(tenantId)
      dadosPedido.numeroPedido = numero.proximoNumero
    }

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

  async createCliente(tenantId: string, dadosCliente: iCliente, dadosPedido: Pedido): Promise<number> {
    const createClienteService = new CreateClienteService()

    const { telefone, cep, logradouro, bairro, cidade, uf } = dadosPedido

    const cliente = { ...dadosCliente, telefone, cep, logradouro, bairro, cidade, uf }

    return await createClienteService.execute(tenantId, cliente)
  }

}

export default CreatePedidoService
