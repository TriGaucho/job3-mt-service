import express, { Request, NextFunction, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'

import AppError from './shared/erros/AppError'
import Logger from './shared/logger/Logger'

import routes from './routes'
import config from './config/config'
import { porta } from '@shared/consts/ambiente'

const app = express()
const versao = config.versao

app.use(cors(config.cors))
app.use(express.json())

app.use(routes)

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

app.listen(porta, () => {
  Logger.info({porta, versao})
})
