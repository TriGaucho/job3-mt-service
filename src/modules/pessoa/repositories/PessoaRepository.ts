import { pessoa } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Pessoa from "../entities/Pessoa"

class PessoaRepository {
  public async showAll(tenantId: string): Promise<Pessoa[] | void> {
    return await knex(pessoa).where({ tenantId })
      .then((dados) => {
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async findCliente(tenantId: string, cpfCnpj: string): Promise<Pessoa| void> {
    return await knex(pessoa).where({ tenantId, cpfCnpj })
      .then((dados) => {
        Logger.info(dados)
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async findClientesPorVendedor(tenantId: string, docUsuario: string): Promise<Pessoa[]| void> {
    return await knex(pessoa).where({ tenantId, docUsuario, idTipoPessoa: 2, ativo: true })
      .then((dados) => {
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async create(dados: Pessoa): Promise<number> {
    return await knex(pessoa).insert(dados)
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

export default PessoaRepository
