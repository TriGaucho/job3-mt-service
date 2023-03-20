import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import SECRET from '@config/config'
import Knex from '../knex/index'
import { usuario } from '../consts/banco'

const CHAVE = SECRET.jwt as string
const MODO_LOGIN = SECRET.modoSeguro

interface ITokenPayload {
  idUsuario: number
  nome: string
  tenantId: string
  nivel: number
  razaoSocial: string
  fantasia: string
}

export default async function ValidaSessao(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
  if (!MODO_LOGIN || !req.usuario) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if (!token) {
      res.status(401).send({ message: 'Sua sessão é inválida ou está expirada' })
      return
    }

    const decodedToken = verify(token, CHAVE as Secret)
    const decoded = decodedToken as ITokenPayload
    const cpfVendedor =  await Knex(usuario).select('docUsuario as idVendedor').where({ idUsuario: decoded.idUsuario }).first()
    req.usuario = {
      ...cpfVendedor,
      idUsuario: decoded.idUsuario,
      nome: decoded.nome,
      emp: decoded.tenantId,
      nivel: decoded.nivel,
      nomeEmpresa: decoded.razaoSocial,
      fantasiaEmpresa: decoded.fantasia
    }

    next()
  }
  next()
}
