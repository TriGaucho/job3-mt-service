import CreateClienteService from '@modules/pessoa/services/CreateClienteService'
import AppError from '@shared/erros/AppError'
import RemoveMascara from '@shared/utils/removeMascaraCPF'
import Documento from '../entities/Documento'
import ProdutosDocumento from '../entities/ProdutosDocumento'
import DocumentoRepository from '../repositories/DocumentoRepository'
import ProximoNumeroService from './ProximoNumeroService'

interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class CreateDocumentoService {
  public async execute(dadosDocumento: Documento,
    produtosDocumento: ProdutosDocumento[],
    dadosCliente: iCliente,
    tenantId: string,
    docUsuario: string): Promise<number> {

    const documentoRepository = new DocumentoRepository()
    const proximoNumeroService = new ProximoNumeroService()
    const createClienteService = new CreateClienteService()

    if (dadosCliente) {
      const { telefone, cep, logradouro, bairro, cidade, uf } = dadosDocumento
      const dadosClienteNovo = {
        ...dadosCliente,
        docUsuario,
        telefone, cep, logradouro, bairro, cidade, uf
      }

      dadosDocumento.cliente = await createClienteService.createClienteDocumentoService(tenantId, dadosClienteNovo)
    }

    const numero = await proximoNumeroService.execute(tenantId)
    dadosDocumento.numeroDocumento = !numero.proximoNumero ? 1 : numero.proximoNumero

    const idDocumento = await documentoRepository.createDocumento({
      ...dadosDocumento,
      cep: await RemoveMascara(dadosDocumento.cep),
      telefone: await RemoveMascara(dadosDocumento.telefone),
      tipoDocumento: dadosDocumento.tipoDocumento === 0 ? 2 : dadosDocumento.tipoDocumento,
      tenantId
    })

    if (!idDocumento) throw new AppError('Não foi possível criar o documento.')

    const produtosDoDocumento = await this.insertIdDocumentoProdutos(idDocumento, tenantId, produtosDocumento)
    const produtos = await documentoRepository.createProdutosDocumento(produtosDoDocumento, idDocumento)

    if (!produtos) throw new AppError(`Não foi possível adastrar os produtos do documento ${idDocumento}.`)

    return idDocumento
  }

  async insertIdDocumentoProdutos(idDocumento: number, tenantId: string, produtos: ProdutosDocumento[]): Promise<ProdutosDocumento[]> {
    await produtos.forEach((produto: ProdutosDocumento) => {
      produto.idDocumento = idDocumento
      produto.tenantId = tenantId
    })
    return produtos
  }
}

export default CreateDocumentoService
