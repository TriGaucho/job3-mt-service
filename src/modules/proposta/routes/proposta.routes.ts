import { Router } from 'express';
import PropostaController from '../controller/PropostaController'

const propostaRouter = Router()

const propostaController = new PropostaController()

propostaRouter.post('/:tenantId', propostaController.create)
propostaRouter.get('/:tenantId', propostaController.get)

export default propostaRouter
