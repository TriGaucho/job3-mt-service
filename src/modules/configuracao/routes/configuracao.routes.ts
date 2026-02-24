import { Router } from 'express';
import ConfiguracoesController from '../controller/ConfiguracoesController'
import VencimentoSenhasController from '../controller/VencimentoSenhasController'

const sessaoRouter = Router()

const configuracoesController = new ConfiguracoesController()
const vencimentoSenhasController = new VencimentoSenhasController()

sessaoRouter.get('/', configuracoesController.show)
sessaoRouter.post('/vencimentoSenhas', vencimentoSenhasController.cadastrarOuAtualizar)
sessaoRouter.get('/vencimentoSenhas', vencimentoSenhasController.consultarVecimentoSenhas)

export default sessaoRouter
