class Documento {
  idDocumento?: number
  numeroDocumento: number
  tenantId: string
  cliente?: number
  docUsuario: string
  email?: string
  planoPagamento?: string
  telefone: string
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  observacoes?: string
  dataEntrega?: Date
  dataPrevisaoEntrega?: Date
  created_at?: Date
  updated_at?: Date
  importado?: boolean
  clienteNome: string
  clienteCpf: string
  tipoDocumento: number
}

export default Documento
