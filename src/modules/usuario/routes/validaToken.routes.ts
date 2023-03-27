import { Router } from 'express';
import SessionsController from '../controller/SessionsController'

const validaToken = Router()

const sessionsController = new SessionsController()

validaToken.post('/', sessionsController.validToken)

export default validaToken
