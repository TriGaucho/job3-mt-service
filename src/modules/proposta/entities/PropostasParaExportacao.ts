class PropostasParaExportacao {
  idProposta: number
  numeroProposta: number
  cliente: string
  idCliente: number
  documentoCliente: string
  cepCliente: string
  logradouroCliente: string
  bairroCliente: string
  cidadeCliente: string
  ufCliente: string
  observacoes: string
  dataProposta: Date
  dataEmissao: Date
  dataPrevisaoEntrega: Date
  email: string
  telefone: string
  cepEntrega: string
  logradouroEntrega: string
  bairroEntrega: string
  cidadeEntrega: string
  ufEntrega: string
  importado: string
  idVendedor: number
  vendedor: string
  documentoVendedor: string
  codigo: string
  descricao: string
  idProduto: number
  observacao: string
  quantidade: number
  valorUnidade: number
  desconto: number
  planoPagamento: string
  tipoDocumento: number
  totalDocumento: number
}

export default PropostasParaExportacao
