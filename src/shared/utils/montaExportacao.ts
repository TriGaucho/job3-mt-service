export default async function montaExportacao (dados: any[]): Promise<any[]> {
  const referencia: any = []
  dados.reduce((p: any, ped) => {
    if (!p[ped.idProposta]) {
      p[ped.idProposta] = {
        idDocumento: ped.idProposta,
        tipoDocumento: ped.tipoDocumento,
        numeroDocumento: ped.numeroProposta,
        dataEmissao: ped.dataEmissao,
        dataDocumento: ped.dataProposta,
        observacoes: !ped.observacoes ? '' : ped.observacoes,
        importado: ped.importado,
        planoPagamento: !ped.planoPagamento ? '' : ped.planoPagamento,
        cliente: {
          cliente: ped.cliente,
          documento: ped.documentoCliente,
          email: !ped.email ? '' : ped.email,
          telefone: !ped.telefone ? '' : ped.telefone,
          endereco: ped.logradouroCliente,
          bairro: ped.bairroCliente,
          cidade: ped.cidadeCliente,
          uf: ped.ufCliente,
          cep: ped.cepCliente
        },
        entrega: {
          endereco: !ped.logradouroEntrega ? ped.logradouroCliente : ped.logradouroEntrega,
          bairro: !ped.logradouroEntrega ? ped.bairroCliente : ped.bairroEntrega,
          cidade: !ped.logradouroEntrega ? ped.cidadeCliente : ped.cidadeEntrega,
          uf: !ped.logradouroEntrega ? ped.ufCliente : ped.ufEntrega,
          cep: !ped.logradouroEntrega ? ped.cepCliente : ped.cepEntrega
        },
        vendedor: {
          vendedor: !ped.vendedor ? '' : ped.vendedor,
          idVendedor: !ped.documentoVendedor ? '' : ped.documentoVendedor
        },
        produtos: []
      }
      referencia.push(p[ped.idProposta])
    }
    p[ped.idProposta].produtos.push({
      codigo: ped.codigo,
      descricao: ped.descricao,
      quantidade: ped.quantidade,
      valorUnitario: ped.valorUnidade,
      desconto: ped.desconto
    })
    return p
  }, {})

  return referencia
}
