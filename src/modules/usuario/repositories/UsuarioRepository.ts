import { usuario } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Usuario from '../entities/Usuario'
import { ativo } from "@shared/consts/ativo"

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

  public async findUsuario(usuario: string, ambiente: string): Promise<any> {
    return await await knex('usuario as U').where({ usuario, ambiente, 'U.ativo': ativo })
      .innerJoin('empresa as E', 'E.cnpj', 'U.tenantId')
      .select('U.idUsuario', 'U.docUsuario', 'U.nome', 'U.tenantId', 'U.nivel', 'U.senha', 'E.razaoSocial', 'E.fantasia')
      .first()
      .then((dados) => {
        return dados
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
