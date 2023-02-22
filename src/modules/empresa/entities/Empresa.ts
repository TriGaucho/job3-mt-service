class Empresa {
  idEmpresa?: number
  cnpj: string
  razaoSocial: string
  fantasia: string
  email: string
  telefone: string
  cep: string
  bairro: string
  logradouro: string
  cidade: string
  uf: string
  qtdUsuarios: number
  ativo?: boolean
  created_at?: Date
  updated_at?: Date
}

export default Empresa
