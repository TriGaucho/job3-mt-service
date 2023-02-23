import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Usuario from '../entities/Usuario'

class UsaurioRepository {
  public async create(usuario: Usuario): Promise<number> {
    return await knex('usuario').insert(usuario).returning('idUsuario')
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async show(idUsuario: number): Promise<Usuario | undefined> {
    return await knex('usuario').where({ idUsuario })
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async showAll(): Promise<Usuario[] | void> {
    return await knex('usuario')
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

export default UsaurioRepository
