import AppError from '@shared/erros/AppError'
import DocumentoExport from '../entities/DocumentoExport'
import DocumentoRepository from '../repositories/DocumentoRepository'

class ShowHeadersDocumentosService {
  public async execute(tenantId: string, idVendedor: number): Promise<DocumentoExport[]> {

    const documentoRepository = new DocumentoRepository()

    const headersDocumentos = await documentoRepository.showHeaders(tenantId, idVendedor)

    if (!headersDocumentos) throw new AppError('Nenhum documento encontrado para o vendedor.')

    return headersDocumentos
  }
}

export default ShowHeadersDocumentosService
