import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/erros/AppError'
import Logger from '@shared/logger/Logger'


interface ITokenPayload {
  idUsuario: number
  docUsuario: string
  nome: string
  emp: string
  nivel: number
  nomeEmpresa: string
  fantasiaEmpresa: string
}



export default async function ValidaSessao(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT inválido ou expirada.');
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)

    const decoded = decodedToken as ITokenPayload

    req.usuario = {
      idUsuario: decoded.idUsuario,
      docUsuario: decoded.docUsuario,
      nome: decoded.nome,
      emp: decoded.emp,
      nivel: decoded.nivel,
      nomeEmpresa: decoded.nomeEmpresa,
      fantasiaEmpresa: decoded.fantasiaEmpresa
    }
    return next()
  } catch (error) {
    Logger.error({mensagem: 'Token inválido!', error})
    throw new AppError('Token inválido!');
  }

}
