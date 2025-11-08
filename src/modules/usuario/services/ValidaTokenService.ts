import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/erros/AppError'
import UsuarioRepository from '../repositories/UsuarioRepository'
import { transformarArrayEmObjeto } from '@shared/helpers/transformarArrayEmObjeto.helper'

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
    const usuarioRepository = new UsuarioRepository()
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

      const modulos = await usuarioRepository.getModulos(user.idUsuario, user.emp)
      const acessos = transformarArrayEmObjeto(modulos)

      const menus = await usuarioRepository.getMenus(user.idUsuario, user.emp)
      const menusAcessos = transformarArrayEmObjeto(menus)

      return {
        user: { ...user, modulos: acessos, menus },
        token
      }

    } catch (error) {
      throw new AppError('Token não foi validado!');
    }

  }
}

export default ValidaTokenService
