import { Request, Response } from 'express'
import PDFCreate from './pdf-create.service'

export default class PdfController {
    public async create(req: Request, res: Response) {
        const pdfCreate = new PDFCreate();
        const { id } = req.params
        const { usuario } = req
        const { body } = req
    
        const pdf = await pdfCreate.create(req.body, usuario)

        res.setHeader('Content-Type', 'application/pdf')

        pdf.info.Title = 'PDF Documento'
        pdf.pipe(res)
        pdf.end()
    }
}