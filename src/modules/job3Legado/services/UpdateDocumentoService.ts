import DocumentoRepository from "@modules/pedido/repositories/DocumentoRepository";
import PropostaRepository from "@modules/proposta/repositories/PropostaRepository";
import { tipoDocumentoPedido, tipoDocumentoProposta, tipoDocumentoVenda } from "@shared/consts/tipoDocumento";
import AppError from "@shared/erros/AppError";


class UpdateDocumentoService {
  public async setImportacaoPedido(tenantId: string, idTipoDocumento: number, idDocumento: number, importado: number): Promise<number> {
    const documentoRepository = new DocumentoRepository()
    const propostaRepository = new PropostaRepository()

    let documento
    switch (idTipoDocumento) {
      case tipoDocumentoPedido || tipoDocumentoVenda:
        documento = await documentoRepository.update(tenantId, idDocumento, importado)
        break
      case tipoDocumentoProposta:
        documento = await propostaRepository.setImportado(tenantId, idDocumento, importado)
        break
    }
    if (!documento) new AppError(`Não foi possível atualizar o(s) documento(s) ${idDocumento}`)
    if (!idTipoDocumento) new AppError(`Necessario indicar idTipoDocumento válido!`)

    return Number(documento)
  }
}

export default UpdateDocumentoService
