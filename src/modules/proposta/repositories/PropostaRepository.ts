import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import { tabProposta, tabProdutosProposta } from "@shared/consts/banco"
import Proposta from "../entities/Proposta"
import ProdutosProposta from "../entities/ProdutosProposta"
import PropostasParaExportacao from "../entities/PropostasParaExportacao"

class PropostaRepository {
  public async createProposta(dados: Proposta): Promise<number> {
    return await knex(tabProposta).insert(dados).returning('idProposta')
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async createProdutosProposta(dados: ProdutosProposta[], idProposta: number): Promise<boolean> {
    return await knex(tabProdutosProposta).insert(dados)
      .then((dados) => {
        Logger.info(dados)
        return true
      })
      .catch(erro => {
        Logger.error(erro)
        this.delete(idProposta)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async delete(idProposta: number): Promise<number> {
    return await knex(tabProposta).where({ idProposta }).del()
      .then((dados) => {
        Logger.info(`Proposta ${idProposta} deletado.`)
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async setImportado(tenantId: string, idProposta: number, importado: number): Promise<number> {
    return await knex(tabProposta).update({ importado }).where({ tenantId, idProposta })
      .then((dados) => {
        return dados
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async exportPropostas(sqlPropostas: string): Promise<PropostasParaExportacao[]> {
    return await knex.raw(sqlPropostas)
      .then((dados) => {
        return dados[0]
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }
}


export default PropostaRepository
