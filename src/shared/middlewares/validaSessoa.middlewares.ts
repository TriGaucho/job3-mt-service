import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import SECRET from '@config/config'
import AppError from '@shared/erros/AppError'

const CHAVE = SECRET.jwt as string


interface ITokenPayload {
  idUsuario: number
  docVendedor: string
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
    const decodedToken = verify(token, CHAVE as Secret)
    const decoded = decodedToken as ITokenPayload

    req.usuario = {
      idUsuario: decoded.idUsuario,
      docUsuario: decoded.docVendedor,
      nome: decoded.nome,
      emp: decoded.emp,
      nivel: decoded.nivel,
      nomeEmpresa: decoded.nomeEmpresa,
      fantasiaEmpresa: decoded.fantasiaEmpresa
    }
    return next()
  } catch (error) {
    throw new AppError('Token inválido!');
  }

}
