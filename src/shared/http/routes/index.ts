import { Router } from 'express'
import empresaRouter from '@modules/empresa/routes/empresa.routes'

const routes = Router()

routes.use('/empresa', empresaRouter)

export default routes
