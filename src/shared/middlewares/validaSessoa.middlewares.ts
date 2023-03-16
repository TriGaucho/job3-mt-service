import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import SECRET from '@config/config'
import Knex from '../knex/index'
import { usuario } from '../consts/banco'

const CHAVE = SECRET.jwt as string
const MODO_LOGIN = SECRET.modoSeguro

export default function ValidaSessao (req: Request, res: Response, next: NextFunction): Response | any {
  if(!MODO_LOGIN) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if (!token) {
      res.status(401).send({ message: 'Sua sessão é inválida ou está expirada' })
      return
    }

    JWT.verify(token, CHAVE, async (err, decoded: any) => {
      if (err) {
        res.status(401).send({ message: 'Sua sessão é inválida ou está expirada' })
      }

      const cpfVendedor = await Knex(usuario).select('cpfcnpj as idVendedor').where({ idUsuario: decoded.idUsuario }).first()
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
    })
  }
  next()
}
