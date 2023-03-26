import { Router } from 'express';
import ProdutoController from '../controller/ProdutoController'

const produtoRouter = Router()

const produtoController = new ProdutoController()

produtoRouter.get('/:tenantId', produtoController.showAll)
produtoRouter.get('/:tenantId/tabela/:tabela', produtoController.produtosPorTabela)

export default produtoRouter
