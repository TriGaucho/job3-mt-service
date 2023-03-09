import AppError from '@shared/erros/AppError'
import proximoNumeroDocumento from "@shared/queries/proximoNumeroDocumento"
import DocumentoRepository from '../repositories/DocumentoRepository'

class ProximoNumeroService {
  public async execute(tenantId: string): Promise<any> {
    const sqlProximoNumero = `${proximoNumeroDocumento.proximoNumero} where tenantId = ${tenantId}`

    const documentoRepository = new DocumentoRepository()

    const proximoNumero = await documentoRepository.proximoNumero(sqlProximoNumero)

    if (!proximoNumero) throw new AppError('Não foi possível obter o número do documento.')

    return proximoNumero
  }
}

export default ProximoNumeroService
