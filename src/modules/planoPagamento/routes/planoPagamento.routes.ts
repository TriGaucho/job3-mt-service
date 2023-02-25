import { Router } from 'express';
import PlanoPagamentoController from '../controller/PlanoPagamentoController'

const produtoRouter = Router()

const planoPagamentoController = new PlanoPagamentoController()

produtoRouter.get('/:tenantId', planoPagamentoController.showAll)

export default produtoRouter
