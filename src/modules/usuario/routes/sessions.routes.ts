import { Router } from 'express';
import SessionsController from '../controller/SessionsController'

const sessaoRouter = Router()

const sessionsController = new SessionsController()

sessaoRouter.post('/', sessionsController.create)

export default sessaoRouter
