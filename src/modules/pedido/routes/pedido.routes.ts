import { Router } from 'express';
import PedidoController from '../controller/PedidoController'

const pedidoRouter = Router()

const empresaController = new PedidoController()

pedidoRouter.get('/proximoNumeroPedido/:tenantId', empresaController.proximoNumeroPedido)
pedidoRouter.post('/:tenantId', empresaController.create)

export default pedidoRouter
