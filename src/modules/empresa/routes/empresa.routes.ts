import { Router } from 'express';
import EmpresaController from '../controller/EmpresaController'

const empresaRouter = Router()

const empresaController = new EmpresaController()

empresaRouter.get('/:idEmpresa', empresaController.show)
empresaRouter.get('/', empresaController.showAll)
empresaRouter.post('/', empresaController.create)

export default empresaRouter
