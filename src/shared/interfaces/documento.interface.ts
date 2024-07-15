import { Interface } from "readline"

export interface IDocumento {

    idDocumento: number
    tipoDocumento: number
    numeroDocumento: null
    dataEmissao: string
    dataDocumento: string
    dataPrevisaoEntrega: string
    observacoes: string
    importado: number
    planoPagamento: string
    cliente: ICliente
    entrega: IEnderecoEntrega
    vendedor: IVendedor
    produtos: IProduto[]
    totalDocumento: number

}

interface ICliente {
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

interface IEnderecoEntrega {
    endereco: string
    bairro: string
    cidade: string
    uf: string
    cep: string
}

interface IVendedor {
    vendedor: string
    idVendedor: string
}

interface IProduto {
    codigo: string
    descricao: string
    quantidade: number
    valorUnitario: number
    desconto: number
}