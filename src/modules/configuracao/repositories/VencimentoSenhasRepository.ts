import { vencimentoSenhas } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import VencimentoSenhas from "../entities/VencimentoSenhas"

class VencimentoSenhasRepository {
  public async consultaPorCNPJ(cnpj: string): Promise<VencimentoSenhas | undefined> {
    return await knex(vencimentoSenhas).where({ cnpj })
      .then((dados) => {
        Logger.info(dados)
        return dados[0] as VencimentoSenhas | undefined
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }


  public async criarOuAtualizar(dados: VencimentoSenhas): Promise<number> {
    return await knex(vencimentoSenhas)
      .insert(dados)
      .onConflict()
      .merge({ ...dados, updated_at: knex.fn.now() })
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

export default VencimentoSenhasRepository
