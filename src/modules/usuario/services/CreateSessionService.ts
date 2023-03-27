import { compare } from 'bcryptjs'
import {Secret, sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/erros/AppError'
import UsuarioRepository from '../repositories/UsuarioRepository'

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
class CreateSessionService {
  public async execute(login: string, senha: string, ambiente: string): Promise<IResponse> {
    const usuarioRepository = new UsuarioRepository()

    const usuario = await usuarioRepository.findUsuario(login, ambiente)

    if (!usuario) throw new AppError('Usuário ou Empresa não encontrado.', 401)

    const senhaConfirmada = await compare(senha, usuario.senha)

    if (!senhaConfirmada) {
      throw new AppError('Senha incorreta.', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      idUsuario: usuario.idUsuario,
      docUsuario: usuario.docUsuario,
      nome: usuario.nome,
      emp: usuario.tenantId,
      nivel: usuario.nivel,
      nomeEmpresa: usuario.razaoSocial,
      fantasiaEmpresa: usuario.fantasia,
      token}
  }
}

export default CreateSessionService
