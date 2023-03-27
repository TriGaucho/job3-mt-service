import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/erros/AppError'

interface IResponse {
  idUsuario: number
  docUsuario: string
  nome: string
  emp: string
  nivel: number
  nomeEmpresa: string
  fantasiaEmpresa: string
  token: string
}


class ValidaTokenService {
  public async execute(headers: any): Promise<any> {
    const authHeader = headers.authorization

    if (!authHeader) {
      throw new AppError('JWT inválido ou expirada.');
    }

    const [, token] = authHeader.split(' ')

    try {
      const decodedToken = verify(token, authConfig.jwt.secret as Secret)

      const decoded = decodedToken as IResponse

      const user = {
        idUsuario: decoded.idUsuario,
        docUsuario: decoded.docUsuario,
        nome: decoded.nome,
        emp: decoded.emp,
        nivel: decoded.nivel,
        nomeEmpresa: decoded.nomeEmpresa,
        fantasiaEmpresa: decoded.fantasiaEmpresa
      }

      return { user, token }

    } catch (error) {
      throw new AppError('Token não foi validado!');
    }

  }
}

export default ValidaTokenService
