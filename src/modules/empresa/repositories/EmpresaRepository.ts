import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Empresa from '../entities/Empresa'

class EmpresaRepository {
  public async create(empresa: Empresa): Promise<number> {
    return await knex('empresa').insert(empresa).returning('idEmpresa')
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async show(idEmpresa: number): Promise<Empresa | undefined> {
    return await knex('empresa').where({ idEmpresa })
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async showAll(): Promise<Empresa[] | void> {
    return await knex('empresa')
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

export default EmpresaRepository
