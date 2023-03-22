import { Router } from 'express';
import DocumentoController from '../controller/DocumentoController'

const documentoRouter = Router()

const empresaController = new DocumentoController()

documentoRouter.post('/:tenantId', empresaController.create)

export default documentoRouter
