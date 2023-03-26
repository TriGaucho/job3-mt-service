import { usuario } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Usuario from '../entities/Usuario'

class UsuarioRepository {
  public async create(dados: Usuario[]): Promise<number> {
    return await knex(usuario).insert(dados).onConflict().merge()
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async showDocUsaurio(idUsuario: number): Promise<string> {
    return await knex(usuario).select('docUsuario').where({ idUsuario })
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async showAll(tenantId: string): Promise<Usuario[] | void> {
    return await knex(usuario).where({ tenantId })
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

export default UsuarioRepository
