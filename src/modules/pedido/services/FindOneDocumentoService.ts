import AppError from '@shared/erros/AppError'
import {documentosSql} from "@shared/queries/documentoCompleto"
import DocumentoExport from '../entities/DocumentoExport'
import DocumentoBanco from '../entities/DocumentoBanco'
import DocumentoRepository from '../repositories/DocumentoRepository'

class FindOneDocumentoService {
  public async execute(tenantId: string, idDocumento: number): Promise<DocumentoExport[]> {

    const sqlConsultaDocumentos = `${documentosSql}
      and pp.tenantId = ${tenantId}
      and pp.idDocumento = ${idDocumento}
       `

    const documentoRepository = new DocumentoRepository()

    const documentos = await documentoRepository.documentDetails(sqlConsultaDocumentos)

    if (!documentos) throw new AppError('Nenhum documento encontrado.')

    const factorDocumentos = await this.montaDocumentosExportacao(documentos)

    const documentoTotalizado = await this.calculaTotal(factorDocumentos).then()

    return documentoTotalizado
  }

  //TODO tornar função UTILS
  async montaDocumentosExportacao (documentosBanco: DocumentoBanco[]): Promise<DocumentoExport[]> {
    const referencia: any = []
    documentosBanco.reduce((p: any, ped) => {
      if (!p[ped.idDocumento]) {
        p[ped.idDocumento] = {
          idDocumento: ped.idDocumento,
          tipoDocumento: ped.tipoDocumento,
          numeroDocumento: ped.numeroDocumento,
          dataEmissao: ped.dataEmissao,
          dataPrevisaoEntrega: ped.dataPrevisaoEntrega,
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
        referencia.push(p[ped.idDocumento])
      }
      p[ped.idDocumento].produtos.push({
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

  async calculaTotal (documentos: any): Promise<any> {
    documentos.forEach((p: any )=> {
      p.totalDocumento = p.produtos.reduce(this.totalDocumento, 0)
    })

    return documentos
  }

  totalDocumento (total: number, item: any) {
    return total + (item.valorUnitario * item.quantidade)
  }
}

export default FindOneDocumentoService
