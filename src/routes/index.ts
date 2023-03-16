import { Router } from 'express'
import ValidaSessaoMiddleware from '@shared/middlewares/validaSessoa.middlewares'

import empresaRouter from '@modules/empresa/routes/empresa.routes'
import usuarioRouter from '@modules/usuario/routes/usuario.routes'
import pessoaRouter from '@modules/pessoa/routes/pessoa.routes'
import produtoRouter from '@modules/produto/routes/produto.routes'
import planoPagamento from '@modules/planoPagamento/routes/planoPagamento.routes'
import documento from '@modules/pedido/routes/documento.routes'
import job3LegadoRouter from '@modules/job3Legado/routes/job3Legado.routes'

const routes = Router()

routes.use('/legadojob3', job3LegadoRouter)

routes.use(ValidaSessaoMiddleware)
routes.use('/empresa', empresaRouter)
routes.use('/usuario', usuarioRouter)
routes.use('/produto', produtoRouter)
routes.use('/pessoa', pessoaRouter)
routes.use('/planopagamento', planoPagamento)
routes.use('/documento', documento)

export default routes
