import { Router } from 'express';
import ConfiguracoesController from '../controller/ConfiguracoesController'

const sessaoRouter = Router()

const configuracoesController = new ConfiguracoesController()

sessaoRouter.get('/', configuracoesController.show)

export default sessaoRouter
