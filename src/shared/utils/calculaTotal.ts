import { quantidadeProdutos, valorZerado } from "@shared/consts/configuracaoPedido"

export default async function calculaTotal (dados: any[]): Promise<any[]> {

  dados.forEach((p: any )=> {
    p.produtos.length > quantidadeProdutos ? p.totalProposta = valorZerado : p.totalProposta = parseFloat(p.produtos.reduce(totalDocumento, 0).toFixed(2))
  })


  return dados
}

export async function totalDocumento (total: number, item: any) {
  return total + (item.valorUnitario * item.quantidade)
}
