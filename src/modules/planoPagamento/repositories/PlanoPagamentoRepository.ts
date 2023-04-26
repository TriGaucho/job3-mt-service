import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import PlanoPagamento from "../entities/PlanoPagamento"
import { ativo } from "@shared/consts/ativo"

class PlanoPagamentoRepository {
  public async showAll(tenantId: string): Promise<PlanoPagamento[] | void> {
    return await knex('planoPagamento').where({ tenantId, ativo })
      .then((dados) => {
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async deleteAll(tenantId: string): Promise<number> {
    return await knex('planoPagamento').where({ tenantId }).del()
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

export default PlanoPagamentoRepository
