import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController'

const usuarioRouter = Router()

const usuarioController = new UsuarioController()

usuarioRouter.post('/:tenantId', usuarioController.create)

export default usuarioRouter
