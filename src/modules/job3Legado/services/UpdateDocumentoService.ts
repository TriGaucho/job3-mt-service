import DocumentoRepository from "@modules/pedido/repositories/DocumentoRepository";
import PropostaRepository from "@modules/proposta/repositories/PropostaRepository";
import AppError from "@shared/erros/AppError";


class UpdateDocumentoService {
  public async setImportacaoPedido(tenantId: string, idDocumento: number, importado: number): Promise<number> {
    const documentoRepository = new DocumentoRepository()

    const documento = documentoRepository.update(tenantId, idDocumento, importado)

    if(!documento) new AppError(`Não foi possível atualizar o(s) documento(s) ${idDocumento}`)

    return documento
  }

  public async setImportacaoProposta(tenantId: string, idProposta: number, filtro: number): Promise<number> {
    const propostaRepository = new PropostaRepository()

    const proposta = propostaRepository.setImportado(tenantId, idProposta, filtro)

    if(!proposta) new AppError(`Não foi possível atualizar a(s) proposas(s) ${filtro}`)

    return proposta
  }
}

export default UpdateDocumentoService
