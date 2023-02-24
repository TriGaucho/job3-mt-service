import { Router } from 'express'
import empresaRouter from '@modules/empresa/routes/empresa.routes'
import usuarioRouter from '@modules/usuario/routes/usuario.routes'
import pessoaRouter from '@modules/pessoa/routes/pessoa.routes'
import produtoRouter from '@modules/produto/routes/produto.routes'
import job3LegadoRouter from '@modules/job3Legado/routes/job3Legado.routes'

const routes = Router()

routes.use('/empresa', empresaRouter)
routes.use('/usuario', usuarioRouter)
routes.use('/produto', produtoRouter)
routes.use('/pessoa', pessoaRouter)
routes.use('/legadojob3', job3LegadoRouter)

export default routes
