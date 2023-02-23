import { Router } from 'express';
import ProdutoController from '../controller/ProdutoController'

const produtoRouter = Router()

const produtoController = new ProdutoController()

produtoRouter.get('/:tenantId', produtoController.showAll)

export default produtoRouter
