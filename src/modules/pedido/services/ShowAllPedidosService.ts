import AppError from '@shared/erros/AppError'
import sqlPedidos from "@shared/queries/pedidoCompleto"
import PedidoExport from '../entities/PedidoExport'
import PedidoBanco from '../entities/PedidoBanco'
import PedidoRepository from '../repositories/PedidoRepository'

class ShowAllPedidosService {
  public async execute(tenantId: string, importado: boolean): Promise<PedidoExport[]> {

    const sqlConsultaPedidos = `${sqlPedidos.pedidos}
      and p.importado = ${importado}
      and pp.tenantId = ${tenantId}
       `

    const pedidoRepository = new PedidoRepository()

    const pedidos = await pedidoRepository.showAll(sqlConsultaPedidos)

    if (!pedidos) throw new AppError('Nenhum pedido encontrado.')

    const factorPedidos = await this.montaPedido(pedidos)

    const pedidoTotalizado = await this.calculaTotal(factorPedidos).then()

    return pedidoTotalizado
  }

  async montaPedido (pedidosBanco: PedidoBanco[]): Promise<PedidoExport[]> {
    const referencia: any = []
    pedidosBanco.reduce((p: any, ped) => {
      if (!p[ped.idPedido]) {
        p[ped.idPedido] = {
          idPedido: ped.idPedido,
          numeroPedido: ped.numeroPedido,
          dataEmissao: ped.dataEmissao,
          dataPrevisaoEntrega: ped.dataPrevisaoEntrega,
          observacoes: !ped.observacoes ? '' : ped.observacoes,
          importado: ped.importado,
          planoPagamento: !ped.planoPagamento ? '' : ped.planoPagamento,
          cliente: {
            cliente: ped.cliente,
            documento: ped.documentoCliente,
            email: !ped.email ? '' : ped.email,
            telefone: !ped.telefone ? '' : ped.telefone,
            endereco: ped.logradouroCliente,
            bairro: ped.bairroCliente,
            cidade: ped.cidadeCliente,
            uf: ped.ufCliente,
            cep: ped.cepCliente
          },
          entrega: {
            endereco: !ped.logradouroEntrega ? ped.logradouroCliente : ped.logradouroEntrega,
            bairro: !ped.logradouroEntrega ? ped.bairroCliente : ped.bairroEntrega,
            cidade: !ped.logradouroEntrega ? ped.cidadeCliente : ped.cidadeEntrega,
            uf: !ped.logradouroEntrega ? ped.ufCliente : ped.ufEntrega,
            cep: !ped.logradouroEntrega ? ped.cepCliente : ped.cepEntrega
          },
          vendedor: {
            vendedor: ped.vendedor,
            idVendedor: ped.documentoVendedor
          },
          produtos: []
        }
        referencia.push(p[ped.idPedido])
      }
      p[ped.idPedido].produtos.push({
        codigo: ped.codigo,
        descricao: ped.descricao,
        quantidade: ped.quantidade,
        valorUnitario: ped.valorUnidade,
        desconto: ped.desconto
      })
      return p
    }, {})

    return referencia
  }

  async calculaTotal (pedidos: any): Promise<any> {
    pedidos.forEach((p: any )=> {
      p.totalPedido = p.produtos.reduce(this.totalPedido, 0)
    })

    return pedidos
  }

  totalPedido (total: number, item: any) {
    return total + (item.valorUnitario * item.quantidade)
  }
}

export default ShowAllPedidosService
