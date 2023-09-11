import AppError from '@shared/erros/AppError'
import {documentosSql} from "@shared/queries/documentoCompleto"
import DocumentoExport from '../entities/DocumentoExport'
import DocumentoBanco from '../entities/DocumentoBanco'
import DocumentoRepository from '../repositories/DocumentoRepository'

class ShowAllDocumentosService {
  public async execute(tenantId: string, importado: boolean): Promise<DocumentoExport[]> {

    const sqlConsultaDocumentos = `${documentosSql}
      and p.importado = ${importado}
      and pp.tenantId = ${tenantId}
       `

    const documentoRepository = new DocumentoRepository()

    const documentos = await documentoRepository.documentDetails(sqlConsultaDocumentos)

    if (!documentos) throw new AppError('Nenhum documento encontrado.')

    const factorDocumentos = await this.montaDocumentosExportacao(documentos)

    const documentoTotalizado = await this.calculaTotal(factorDocumentos).then()

    return documentoTotalizado
  }

  public async executeAll(tenantId: string, idUsaurio: number): Promise<DocumentoExport[]> {

    const sqlConsultaDocumentos = `${documentosSql}
      and v.idUsuario = ${idUsaurio}
      and pp.tenantId = ${tenantId}
       `

    const documentoRepository = new DocumentoRepository()

    const documentos = await documentoRepository.documentDetails(sqlConsultaDocumentos)

    // if (!documentos) throw new AppError('Nenhum documento encontrado.')

    const factorDocumentos = await this.montaDocumentosExportacao(documentos)

    const documentoTotalizado = await this.calculaTotal(factorDocumentos).then()

    return documentoTotalizado
  }

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
      p.tipoDocumento == 1 ? p.totalDocumento = 0 : p.totalDocumento = parseFloat(p.produtos.reduce(this.totalDocumento, 0).toFixed(2))
    })

    return documentos
  }

  totalDocumento (total: number, item: any) {
    return total + (item.valorUnitario * item.quantidade)
  }
}

export default ShowAllDocumentosService
