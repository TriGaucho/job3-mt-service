import { Router } from 'express';
import DocumentoController from '../controller/DocumentoController'

const documentoRouter = Router()

const empresaController = new DocumentoController()

documentoRouter.get('/proximoNumero/:tipo/:tenantId', empresaController.proximoNumeroDocumento)
documentoRouter.get('/:tenantId/:idDocumento', empresaController.detalhesDocumento)
documentoRouter.get('/:tenantId', empresaController.headersDocumentos)
documentoRouter.post('/:tenantId', empresaController.create)
documentoRouter.delete('/:tenantId/:idDocumento', empresaController.excluirDocumento)

export default documentoRouter
