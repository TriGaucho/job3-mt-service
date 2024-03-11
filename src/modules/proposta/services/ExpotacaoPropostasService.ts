import AppError from '@shared/erros/AppError'
import PropostasParaExportacao from '../entities/PropostasParaExportacao'
import PropostaRepository from '../repositories/PropostaRepository'
import { sqlDadosPropostas } from '@shared/queries/sqlDadosPropostas'
import montaExportacao from '@shared/utils/montaExportacao'
import { quantidadeProdutos, valorZerado } from '@shared/consts/configuracaoPedido'

class ExpotacaoPropostasService {

  public async execute(tenantId: string, importado: boolean): Promise<PropostasParaExportacao[]> {
    const propostaRepository = new PropostaRepository()

    const sql = `${sqlDadosPropostas}
      and p.importado = ${importado}
      and pp.tenantId = ${tenantId}
    `

    const dadosPropostas = await propostaRepository.exportPropostas(sqlDadosPropostas);

    const propostasNormalizadas = await montaExportacao(dadosPropostas);

    const propostas = this.calculaTotal(propostasNormalizadas)

    return propostas
  }

  async calculaTotal (documentos: PropostasParaExportacao[]): Promise<PropostasParaExportacao[]> {

    documentos.forEach((p: any )=> {
       p.produtos.length > quantidadeProdutos ? p.totalProposta = valorZerado : p.totalProposta = parseFloat(p.produtos.reduce(this.totalDocumento, 0).toFixed(2))
    })

    return documentos
  }

  totalDocumento (total: number, item: any) {
    return total + (item.valorUnitario * item.quantidade)
  }
}

export default ExpotacaoPropostasService
