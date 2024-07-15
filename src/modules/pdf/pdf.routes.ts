import { Router } from 'express';
import PDFController from './pdf.controller'

const pdfRouter = Router()

const pdfController = new PDFController()

pdfRouter.post('/:tenantId', pdfController.create)

export default pdfRouter
