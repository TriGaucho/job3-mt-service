import { documento, produtosDocumento } from "@shared/consts/banco"
import AppError from "@shared/erros/AppError"
import knex from "@shared/knex"
import Logger from "@shared/logger/Logger"
import Documento from '../entities/Documento'
import DocumentoBanco from '../entities/DocumentoBanco'
import ProdutosDocumento from '../entities/ProdutosDocumento'

class DocumentoRepository {
  public async createDocumento(dados: Documento): Promise<number> {
    return await knex(documento).insert(dados).returning('idDocumento')
      .then((dados) => {
        Logger.info(dados[0])
        return dados[0]
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async createProdutosDocumento(dados: ProdutosDocumento[], idDocumento: number): Promise<boolean> {
    return await knex(produtosDocumento).insert(dados)
      .then((dados) => {
        Logger.info(dados)
        return true
      })
      .catch(erro => {
        Logger.error(erro)
        this.delete(idDocumento)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async delete(idDocumento: number): Promise<number> {
    return await knex(documento).where({ idDocumento }).del()
      .then((dados) => {
        Logger.info(`Documento ${idDocumento} deletado.`)
        Logger.info(dados)
        return dados
      })
      .catch(erro => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async documentDetails(sqlDocumentos: string): Promise<DocumentoBanco[]> {
    return await knex.raw(sqlDocumentos)
      .then((dados) => {
        return dados[0]
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async update(tenantId: string, idDocumento: number, importado: number): Promise<number> {
    return await knex(documento).update({ importado }).where({ tenantId, idDocumento })
      .then((dados) => {
        return dados
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }


  public async proximoNumero(sql: string): Promise<number> {
    return await knex.raw(sql)
      .then((dados) => {
        return dados[0][0]
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async showHeaders(tenantId: string, idUsuario: number): Promise<any> {
    return await knex(documento)
      .join('pessoa AS cli', 'cli.idPessoa', 'documento.cliente')
      .join('usuario AS ven', 'ven.idUsuario', 'documento.idUsuario')
      .select('ven.nome', 'cli.nome', 'documento.*')
      .where({ 'documento.tenantId': tenantId, 'documento.idUsuario': idUsuario })
      .then((dados) => {
        return dados
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }

  public async exclusaoLogica(dados: {tenantId: string, idDocumento: number}): Promise<number> {
    const { tenantId, idDocumento } = dados
    return await knex(documento).update({ excluido: true }).where({ tenantId, idDocumento })
      .then((dados) => {
        return dados
      })
      .catch((erro) => {
        Logger.error(erro)
        throw new AppError(erro.sqlMessage)
      })
  }



}

export default DocumentoRepository
