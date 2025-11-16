import DocumentoRepository from '../repositories/DocumentoRepository'


class ExcluirDocumentoService {
  public async execute(dados: {idDocumento: number, tenantId: string}) {
    const documentoRepository = new DocumentoRepository();
    const { idDocumento, tenantId } = dados
    const resultado = await documentoRepository.exclusaoLogica({ tenantId, idDocumento })
    
    return resultado;
  }
}
  
export default ExcluirDocumentoService
