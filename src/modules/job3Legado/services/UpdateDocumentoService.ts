import DocumentoRepository from "@modules/pedido/repositories/DocumentoRepository";
import AppError from "@shared/erros/AppError";


class UpdateDocumentoService {
  public async execute(tenantId: string, idDocumento: number, importado: number): Promise<number> {
    const documentoRepository = new DocumentoRepository()

    const documento = documentoRepository.update(tenantId, idDocumento, importado)

    if(!documento) new AppError(`Não foi possível atualizar o(s) documento(s) ${idDocumento}`)

    return documento
  }
}

export default UpdateDocumentoService
