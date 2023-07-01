import { Router } from 'express'
import 'dotenv/config'

import LoggerMiddleware from '@shared/middlewares/logger.middlewares'
import ValidaSessaoMiddleware from '@shared/middlewares/validaSessoa.middlewares'

import empresaRouter from '@modules/empresa/routes/empresa.routes'
import usuarioRouter from '@modules/usuario/routes/usuario.routes'
import sessionsRouter from '@modules/usuario/routes/sessions.routes'
import validaTokenRouter from '@modules/usuario/routes/validaToken.routes'
import pessoaRouter from '@modules/pessoa/routes/pessoa.routes'
import clientRouter from '@modules/pessoa/routes/cliente.routes'
import produtoRouter from '@modules/produto/routes/produto.routes'
import planoPagamento from '@modules/planoPagamento/routes/planoPagamento.routes'
import documento from '@modules/pedido/routes/documento.routes'
import pedido from '@modules/pedido/routes/pedido.routes'
import job3LegadoRouter from '@modules/job3Legado/routes/job3Legado.routes'
import configuracoes from '@modules/configuracao/routes/configuracao.routes'

const routes = Router()

routes.use('/login', sessionsRouter)
routes.use('/validarToken', validaTokenRouter)

routes.use(LoggerMiddleware)
routes.use('/config', configuracoes)

//TODO criar um middlware para validar tenantId
routes.use('/legadojob3', job3LegadoRouter)

routes.use('/cliente-pedido', clientRouter)
routes.use('/documento-pedido', pedido)
routes.use('/produto-pedido', produtoRouter)

//TODO criar uma validação para usuario ADMIN JOB3
routes.use('/empresa', empresaRouter)

routes.use(ValidaSessaoMiddleware)
routes.use('/usuario', usuarioRouter)
routes.use('/produto', produtoRouter)
routes.use('/pessoa', pessoaRouter)
routes.use('/planopagamento', planoPagamento)
routes.use('/documento', documento)

export default routes
