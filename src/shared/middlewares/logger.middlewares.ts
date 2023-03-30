import { Request, Response, NextFunction } from 'express'
import Logger from '@shared/logger/Logger'

export default async function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const dados = {
    rota: req.path,
    metodo: req.method,
    dados: { ...req.body }
  }

  Logger.info(dados)

  return next()
}
