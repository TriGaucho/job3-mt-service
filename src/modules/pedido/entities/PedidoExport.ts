interface clientePedido {
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

interface entregaPedido {
  endereco: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

interface vendedorPedido {
  vendedor: string
  idVendedor: string
}

interface produtosPedido {
  codigo: number
  descricao: string
  quantidade: number
  valorUnitario: number
  desconto: number
}

class Pedido {
  idPedido: number
  dataEmissao: Date
  dataPrevisaoEntrega: Date
  observacoes: string
  importado: boolean
  planoPagamento: string
  cliente: clientePedido
  entrega: entregaPedido
  vendedor: vendedorPedido
  produtos: produtosPedido[]
  totalPedido: number
}

export default Pedido
