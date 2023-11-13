import { compare } from 'bcryptjs'
import { Secret, sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/erros/AppError'
import UsuarioRepository from '../repositories/UsuarioRepository'

interface IResponse {
  user: {
    idUsuario: number
    docUsuario: string
    nome: string
    emp: string
    nivel: number
    nomeEmpresa: string
    fantasiaEmpresa: string
  }
  token: string
}
class CreateSessionService {
  public async execute(login: string, senha: string, ambiente: string): Promise<IResponse | string> {
    const usuarioRepository = new UsuarioRepository()

    const usuario = await usuarioRepository.findUsuario(login, ambiente)

    if (!usuario) return 'Usuário ou Empresa não encontrado.'

    const senhaConfirmada = await compare(senha, usuario.senha)

    if (!senhaConfirmada) {
      return 'Senha incorreta.';
    }

    const user = {
      idUsuario: usuario.idUsuario,
      docUsuario: usuario.docUsuario,
      nome: usuario.nome,
      emp: usuario.tenantId,
      nivel: usuario.nivel,
      nomeEmpresa: usuario.razaoSocial,
      fantasiaEmpresa: usuario.fantasia
    }
    const token = sign({
      idUsuario: usuario.idUsuario,
      docUsuario: usuario.docUsuario,
      nome: usuario.nome,
      emp: usuario.tenantId,
      nivel: usuario.nivel,
      nomeEmpresa: usuario.razaoSocial,
      fantasiaEmpresa: usuario.fantasia
    }, authConfig.jwt.secret as Secret
      // {
      //   expiresIn: authConfig.jwt.expiresIn,
      // }
    );

    return {
      user,
      token
    }
  }
}

export default CreateSessionService
