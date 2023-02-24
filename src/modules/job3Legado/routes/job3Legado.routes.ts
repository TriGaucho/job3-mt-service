import { Router } from 'express';
import Job3LegadoController from '../controller/Job3LegadoController'

const empresaRouter = Router()

const job3LegadoController = new Job3LegadoController()

empresaRouter.post('/produto/:tenantId', job3LegadoController.importProdutos)
empresaRouter.post('/pessoa/:tenantId', job3LegadoController.importPessoas)

export default empresaRouter
