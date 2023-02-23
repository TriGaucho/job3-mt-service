import { Router } from 'express';
import Job3LegadoController from '../controller/Job3LegadoController'

const empresaRouter = Router()

const job3LegadoController = new Job3LegadoController()

empresaRouter.post('/produto/:tenantId', job3LegadoController.createorUpdate)

export default empresaRouter
