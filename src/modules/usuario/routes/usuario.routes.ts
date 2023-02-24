import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController'

const usuarioRouter = Router()

const usuarioController = new UsuarioController()

usuarioRouter.post('/:tenantId', usuarioController.create)
usuarioRouter.get('/:tenantId', usuarioController.showAll)

export default usuarioRouter
