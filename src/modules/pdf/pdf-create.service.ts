import PdfPrinter from 'pdfmake'
import { propostaReport } from './reports/proposta.report'
import PropostasParaExportacao from '@modules/proposta/entities/PropostasParaExportacao'
import { IDocumento } from '@shared/interfaces/documento.interface'
import { IUsuario } from '@shared/interfaces/usuario.interface'

const fonts = {
    Roboto: {
      normal: 'fonts/Roboto/Roboto-Regular.ttf',
      bold: 'fonts/Roboto/Roboto-Medium.ttf',
      italics: 'fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    }
  }

class PDFCreateService {
    private printer = new PdfPrinter(fonts);

    
    async create(dadosDocumento: IDocumento, dadosUsuario: IUsuario ) {
        const docDefinition = propostaReport(dadosDocumento, dadosUsuario)
        return this.printer.createPdfKitDocument(docDefinition);
    }
}

export default PDFCreateService;