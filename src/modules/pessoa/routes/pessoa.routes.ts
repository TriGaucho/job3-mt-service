import { Router } from 'express';
import PessoaController from '../controller/PessoaController'

const pessoaRouter = Router()

const pessoaController = new PessoaController()

pessoaRouter.get('/:tenantId', pessoaController.showAll)
pessoaRouter.get('/:tenantId/:cliente', pessoaController.findCliente)

export default pessoaRouter
