import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Pessoa from '../../pessoa/entities/Pessoa'
import Produto from '../../produto/entities/Produto'

class EmpresaRepository {
  public async createOrUpdate(dados: Produto[] | Pessoa[], tabela: string): Promise<number> {
    //TODO Repository generico
    return await knex(tabela).insert(dados).onConflict().merge()
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }
}

export default EmpresaRepository
