import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Pessoa from '@modules/pessoa/entities/Pessoa'
import Produto from '@modules/produto/entities/Produto'
import Usuario from "@modules/usuario/entities/Usuario"
import PlanoPagamento from "@modules/planoPagamento/entities/PlanoPagamento"

class EmpresaRepository {
  public async createOrUpdate(dados: Produto[] | Pessoa[] | Usuario[] | PlanoPagamento[], tabela: string): Promise<number> {
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
