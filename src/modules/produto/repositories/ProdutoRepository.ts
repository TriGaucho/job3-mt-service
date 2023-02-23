import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Produto from "../entities/Produto"

class ProdutoRepository {
  public async showAll(tenantId: string): Promise<Produto[] | void> {
    return await knex('produto').where({ tenantId })
      .then((dados) => {
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }
}

export default ProdutoRepository
