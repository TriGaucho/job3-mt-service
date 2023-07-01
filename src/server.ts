import express, { Request, NextFunction, Response,  } from 'express'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'

import AppError from './shared/erros/AppError'
import Logger from './shared/logger/Logger'

import routes from './routes'
import config from './config/config'
import { ambiente, api, portaApi } from '@shared/consts/ambiente'

const app = express()
const {versao, porta} = config

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(routes)

// Middleware de interceptação de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(error)
  if (error instanceof AppError) {
    const errorObject = {
      status: 'instanceof AppError',
      message: error.message
    }
    return res.status(error.statusCode).json(errorObject)
  }

  const errorObject = {
    status: 'error',
    message: 'Erro interno do servidor !'
  }

  return res.status(500).json(errorObject)
})

app.listen(porta, '127.0.0.1',  () => {
  Logger.info(`API ${api} - ${ambiente}/${versao}, carregada na porta ${portaApi}`)
})
