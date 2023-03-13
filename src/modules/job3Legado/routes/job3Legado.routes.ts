import { Router } from 'express';
import Job3LegadoController from '../controller/Job3LegadoController'

const empresaRouter = Router()

const job3LegadoController = new Job3LegadoController()

empresaRouter.post('/produto/:tenantId', job3LegadoController.importProdutos)
empresaRouter.post('/pessoa/:tenantId', job3LegadoController.importPessoas)
empresaRouter.post('/usuario/:tenantId', job3LegadoController.importUsuarios)
empresaRouter.post('/planopagamento/:tenantId', job3LegadoController.importPlanosPagamento)
empresaRouter.get('/documentos/:tenantId', job3LegadoController.exportaDocumentos)
empresaRouter.put('/documentos/:tenantId/:importado', job3LegadoController.updateDocumento)

export default empresaRouter
