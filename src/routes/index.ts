import { Router } from 'express'
import empresaRouter from '@modules/empresa/routes/empresa.routes'
import usuarioRouter from '@modules/usuario/routes/usuario.routes'

const routes = Router()

routes.use('/empresa', empresaRouter)
routes.use('/usuario', usuarioRouter)

export default routes
