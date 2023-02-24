import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Pessoa from "../entities/Pessoa"

class PessoaRepository {
  public async showAll(tenantId: string): Promise<Pessoa[] | void> {
    return await knex('pessoa').where({ tenantId })
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

export default PessoaRepository
