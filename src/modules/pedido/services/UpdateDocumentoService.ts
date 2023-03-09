import AppError from "@shared/erros/AppError";
import DocumentoRepository from "../repositories/DocumentoRepository";

class UpdateDocumentoService {
  public async execute(tenantId: string, idDocumentos: number[], filtro: object, ): Promise<number> {
    const documentoRepository = new DocumentoRepository()

    const documento = documentoRepository.update(tenantId, idDocumentos, filtro)

    if(!documento) new AppError(`Não foi possível atualizar o(s) documento(s) ${filtro}`)

    return documento
  }
}

export default UpdateDocumentoService
