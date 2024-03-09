import { Router } from 'express';
import PropostaController from '../controller/PropostaController'

const propostaRouter = Router()

const propostaController = new PropostaController()

propostaRouter.post('/:tenantId', propostaController.create)

export default propostaRouter
