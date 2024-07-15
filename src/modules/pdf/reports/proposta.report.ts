import PropostasParaExportacao from "@modules/proposta/entities/PropostasParaExportacao";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { extrairData } from "src/common/helpers/datas.helper";
import { mascaraCEP, mascaraTelefone } from "src/common/helpers/telefone.helper";
import { IDocumento } from "src/common/interfaces/documento.interface";
import { IUsuario } from "src/common/interfaces/usuario.interface";

export const propostaReport = (dadosProposta: IDocumento, dadosUsaurios: IUsuario): TDocumentDefinitions => {
    return {
        header: {
            text: `Proposta - Número: ${dadosProposta.idDocumento}`, bold: true,
            alignment: 'center',
            fontSize: 20,
            margin: [0, 5],
        },
        content: [
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 1,
                    },
                ],
                margin: [0, 5, 0, 5]
            },
            {
                text: `Dados do Emitente`,
                style: 'texto_titulo'
            },
            {
                columns: [
                    {
                        text: [
                            { text: `Emitente: `, bold: true },
                            { text: dadosUsaurios.fantasiaEmpresa }
                        ],
                        style: 'texto_base',
                        alignment: 'left'
                    },
                    {
                        text: [
                            { text: `Data de Emissão: `, bold: true },
                            { text: extrairData(dadosProposta.dataEmissao) }
                        ],
                        style: 'texto_base',
                        alignment: 'right'
                    },
                ]
            },
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 1,
                    },
                ],
                margin: [0, 5, 0, 5]
            },
            {
                text: `Dados do Cliente`,
                style: 'texto_titulo'
            },
            {
                columns: [
                    {
                        text: [
                            { text: `Cliente: `, bold: true },
                            { text: dadosProposta.cliente.cliente }
                        ],
                        style: 'texto_base',
                        alignment: 'left',
                        width: 'auto'
                    },
                    {
                        text: [
                            { text: `E-mail: `, bold: true },
                            { text: dadosProposta.cliente.email }
                        ],
                        style: 'texto_base',
                        alignment: 'center',
                        width: 'auto'
                    },
                    {
                        text: [
                            { text: `Telefone: `, bold: true },
                            { text: mascaraTelefone(dadosProposta.cliente.telefone) }
                        ],
                        style: 'texto_base',
                        alignment: 'right',
                        width: '*'
                    },
                ]
            },
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 1,
                    },
                ],
                margin: [0, 5, 0, 5]
            },
            {
                text: `Entrega`,
                style: 'texto_titulo'
            },
            {
                columns: [
                    {
                        text: [
                            { text: `Endereço: `, bold: true },
                            { text: dadosProposta.entrega.endereco }
                        ],
                        style: 'texto_base',
                        alignment: 'left',
                        width: 'auto'
                    },
                    {
                        text: [
                            { text: `Bairro: `, bold: true },
                            { text: dadosProposta.entrega.bairro }
                        ],
                        style: 'texto_base',
                        alignment: 'right',
                        width: '*'
                    },
                ]
            },
            {
                columns: [
                    {
                        text: [
                            { text: `Cidade/UF: `, bold: true },
                            { text: `${dadosProposta.entrega.cidade}/${dadosProposta.entrega.uf}` }
                        ],
                        style: 'texto_base',
                        alignment: 'left',
                        width: 'auto'
                    },
                    {
                        text: [
                            { text: `CEP: `, bold: true },
                            { text: mascaraCEP(dadosProposta.entrega.cep) }
                        ],
                        style: 'texto_base',
                        alignment: 'right',
                        width: '*'
                    }
                ]
            },
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 1,
                    },
                ],
                margin: [0, 5, 0, 5]
            },
            {
                text: `Produtos`,
                style: 'texto_titulo'
            },
            {
                margin: [0, 0],
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', '*', '*'],
                    body: [
                        [
                            { text: 'Código', bold: true },
                            { text: 'Descrição', bold: true },
                            { text: 'Quantidade', bold: true, alignment: 'center' },
                            { text: 'Valor Unitário', bold: true }
                        ],
                        ...dadosProposta.produtos.map(produto => {
                            return [
                                { text: produto.codigo },
                                { text: produto.descricao },
                                { text: produto.quantidade, alignment: 'center'  },
                                { text: `R$ ${produto.valorUnitario}`, alignment: 'right' }
                            ]
                        }),
                        [
                            {text: '', colSpan: 2, border: [false, false, false, false]}, 
                            {}, 
                            { text: 'TOTAL', bold: true, alignment: 'left' }, 
                            { text: `R$ ${dadosProposta.totalDocumento}`, alignment: 'right' }]
                    ]
                }
            },
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 1,
                    },
                ],
                margin: [0, 5, 0, 5]
            },
            {
                text: `Observações: `,
                style: 'texto_titulo'
            },
            { text: dadosProposta.observacoes, style: 'texto_base', alignment: 'left' },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            texto_base: {
                fontSize: 10,
                margin: [5, 5],
            },
            texto_titulo: {
                fontSize: 12,
                margin: [5, 5],
            }
        }
    }
}