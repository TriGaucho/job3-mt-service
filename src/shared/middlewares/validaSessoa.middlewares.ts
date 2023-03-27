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

  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

  if (!token) {
    throw new AppError('Sua sessão é inválida ou está expirada')
  }

  try {
    const decodedToken = verify(token, authConfig as Secret)
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
