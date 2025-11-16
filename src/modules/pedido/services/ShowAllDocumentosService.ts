import AppError from '@shared/erros/AppError'
import {documentosSql} from "@shared/queries/documentoCompleto"
import DocumentoExport from '../entities/DocumentoExport'
import DocumentoBanco from '../entities/DocumentoBanco'
import DocumentoRepository from '../repositories/DocumentoRepository'
import { tipoDocumentoPedido } from '@shared/consts/tipoDocumento'
import { quantidadeProdutos, valorZerado } from '@shared/consts/configuracaoPedido'

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

    const documentoTotalizado = await this.calculaTotal(factorDocumentos)

    return documentoTotalizado
  }

  public async executeAll(tenantId: string, idUsaurio: number): Promise<DocumentoExport[]> {

    const sqlConsultaDocumentos = `${documentosSql}
      and v.idUsuario = ${idUsaurio}
      and pp.tenantId = ${tenantId}
      and p.excluido = 0
       `

    const documentoRepository = new DocumentoRepository()

    const documentos = await documentoRepository.documentDetails(sqlConsultaDocumentos)

    // if (!documentos) throw new AppError('Nenhum documento encontrado.')

    const factorDocumentos = await this.montaDocumentosExportacao(documentos)

    const documentoTotalizado = await this.calculaTotal(factorDocumentos)

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
          dataDocumento: ped.dataDocumento,
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

  async calculaTotal(documentos: DocumentoExport[]): Promise<DocumentoExport[]> {
    for (let i = 0; i < documentos.length; i++) {
      const documento = documentos[i];
      const totalDocumento = this.calcularTotalDocumento(documento.produtos);
      documento.totalDocumento = totalDocumento;
    }
    
    return documentos;
  }

   calcularTotalDocumento(produtos: any[]): number {
    let total = 0;
    produtos.forEach((produto) => {
      const quantidade = parseFloat(produto.quantidade);
      const valorUnitario = parseFloat(produto.valorUnitario);
      const desconto = parseFloat(produto.desconto);
      total += (quantidade * valorUnitario) - desconto;
    });
    return parseFloat(total.toFixed(2));
  }
}

export default ShowAllDocumentosService
