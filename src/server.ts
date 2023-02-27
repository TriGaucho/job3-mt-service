import express, { Request, NextFunction, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'

import AppError from './shared/erros/AppError'
import Logger from './shared/logger/Logger'

import routes from './routes'

const app = express()
const port = process.env.PORT_SERVICE

app.use(cors())
app.use(express.json())

// Middleware de log
app.use((req: Request, res: Response, next: NextFunction) => {
  const dados = {
    rota: req.path,
    metodo: req.method,
    dados: { ...req.body }
  }

  Logger.info(dados)

  return next()
})

app.use(routes)

routes.get('/', (request, response) => {
  return response.json({ message: '20230218' });
})


// Middleware de interceptação de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    const errorObject = {
      status: 'error',
      message: error.message
    }

    Logger.error(errorObject)
    return res.status(error.statusCode).json(errorObject)
  }

  const errorObject = {
    status: 'error',
    message: 'Erro interno do servidor !'
  }
  Logger.error(errorObject)
  return res.status(500).json(errorObject)
})

app.listen(port, () => {
  Logger.info(`Servidor iniciado na porta ${port} !`)
})
