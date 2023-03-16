// OVERRIDE de resquest
declare namespace Express {
  export interface Request {
    usuario: {
      idVendedor: string
      idUsuario: number
      nome: string
      emp: string
      nivel: number
      nomeEmpresa: string
      fantasiaEmpresa: string
    }
  }
}
