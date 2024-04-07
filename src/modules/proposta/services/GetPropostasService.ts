import AppError from '@shared/erros/AppError'
import PropostasParaExportacao from '../entities/PropostasParaExportacao'
import PropostaRepository from '../repositories/PropostaRepository'
import { sqlDadosPropostas } from '@shared/queries/sqlDadosPropostas'
import montaExportacao from '@shared/utils/montaExportacao'
import { quantidadeProdutos, valorZerado } from '@shared/consts/configuracaoPedido'

class GetPropostasService {

  public async execute(tenantId: string, idUsaurio: number,  importado: boolean): Promise<PropostasParaExportacao[]> {
    const propostaRepository = new PropostaRepository()

    let sql = `${sqlDadosPropostas}
      and pp.tenantId = ${tenantId}
    `

    !importado ? sql += `and p.importado = ${importado}` : sql += `and v.idUsuario = ${idUsaurio}` ;
    
    const dadosPropostas = await propostaRepository.exportPropostas(sql);

    const propostasNormalizadas = await montaExportacao(dadosPropostas);

    const propostas = this.calculaTotal(propostasNormalizadas)

    return propostas
  }

  async calculaTotal (documentos: PropostasParaExportacao[]): Promise<PropostasParaExportacao[]> {

    documentos.forEach((p: any )=> {
       p.produtos.length > quantidadeProdutos ? p.totalDocumento = valorZerado : p.totalDocumento = parseFloat(p.produtos.reduce(this.totalDocumento, 0).toFixed(2))
    })

    return documentos
  }

  totalDocumento (total: number, item: any) {
    return total + (item.valorUnitario * item.quantidade)
  }
}

export default GetPropostasService
