class Produto {
  idProduto?: number
  tenantId: string
  codigo: string
  descricao: string
  unidade: string
  valorUnidade: number
  valorAtacado?: number
  valorRevenda?: number
  valorTabela4?: number
  ativo?: boolean
  created_at?: Date
  updated_at?: Date
  subclasse?: string
}

export default Produto
