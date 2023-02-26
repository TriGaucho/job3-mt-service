import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Pedido from '../entities/Pedido'
import ProdutosPedido from '../entities/ProdutosPedido'

class PedidoRepository {
  public async createPedido(pedido: Pedido): Promise<number> {
    return await knex('pedido').insert(pedido).returning('idPedido')
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async createProdutosPedido(produtosPedido: ProdutosPedido[], idPedido: number): Promise<boolean> {
    return await knex('produtosPedido').insert(produtosPedido)
      .then((dados) => {
        Logger.info(dados)
        return true
      })
      .catch(erro => {
        Logger.error(erro)
        this.delete(idPedido)
        throw new AppError(erro.sqlMessage)
      })
    }

    public async delete(idPedido: number): Promise<number> {
      return await knex('pedido').where({ idPedido }).del()
      .then((dados) => {
        Logger.info(`Pedido ${idPedido} deletado.`)
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

}

export default PedidoRepository
