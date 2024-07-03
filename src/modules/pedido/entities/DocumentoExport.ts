interface clienteDocumento {
  cliente: string
  documento: string
  email: string
  telefone: string
  endereco: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

interface entregaDocumento {
  endereco: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

interface vendedorDocumento {
  vendedor: string
  idVendedor: string
}

interface produtosDocumento {
  codigo: number
  descricao: string
  quantidade: number
  valorUnitario: number
  desconto: number
}

class Documento {
  idDocumento: number
  dataEmissao: Date
  dataPrevisaoEntrega: Date
  observacoes: string
  importado: boolean
  planoPagamento: string
  cliente: clienteDocumento
  entrega: entregaDocumento
  vendedor: vendedorDocumento
  produtos: produtosDocumento[]
  totalDocumento: number
  tipoDocumento: number
}

export default Documento
