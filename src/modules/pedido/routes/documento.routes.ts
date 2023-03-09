import { Router } from 'express';
import DocumentoController from '../controller/DocumentoController'

const documentoRouter = Router()

const empresaController = new DocumentoController()

documentoRouter.get('/proximoNumero/:tipo/:tenantId', empresaController.proximoNumeroDocumento)
documentoRouter.post('/:tenantId', empresaController.create)

export default documentoRouter
