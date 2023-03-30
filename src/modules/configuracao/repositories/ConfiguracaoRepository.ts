import { configuracoes } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Configs from "../entities/Configs"

class ConfiguracaoRepository {
  public async show(): Promise<Configs[] | void> {
    return await knex(configuracoes)
      .then((dados) => {
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }
}

export default ConfiguracaoRepository
