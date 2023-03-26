// OVERRIDE de resquest
declare namespace Express {
  export interface Request {
    usuario: {
      idUsuario: number
      docUsuario: string
      nome: string
      emp: string
      nivel: number
      nomeEmpresa: string
      fantasiaEmpresa: string
    }
  }
}
