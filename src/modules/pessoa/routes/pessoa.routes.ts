import { Router } from 'express';
import PessoaController from '../controller/PessoaController'

const pessoaRouter = Router()

const pessoaController = new PessoaController()

pessoaRouter.get('/clientes/:tenantId', pessoaController.findClientesPorVendedor)
pessoaRouter.get('/:tenantId', pessoaController.showAll)
pessoaRouter.get('/:cliente/:tenantId', pessoaController.findCliente)

export default pessoaRouter
