import CreateClienteService from '@modules/pessoa/services/CreateClienteService'
import AppError from '@shared/erros/AppError'
import Documento from '../entities/Documento'
import ProdutosDocumento from '../entities/ProdutosDocumento'
import DocumentoRepository from '../repositories/DocumentoRepository'
import ProximoNumeroService from './ProximoNumeroService'

interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class CreateDocumentoService {
  public async execute(dadosDocumento: Documento, produtosDocumento: ProdutosDocumento[], dadosCliente: iCliente, tenantId: string): Promise<number> {
    const documentoRepository = new DocumentoRepository()

    if (dadosCliente) {
      dadosDocumento.cliente = await this.createCliente(tenantId, dadosCliente, dadosDocumento)
    }

    if (!dadosDocumento.numeroDocumento) {
      const proximoNumeroService = new ProximoNumeroService()
      const numero = await proximoNumeroService.execute(tenantId)
      dadosDocumento.numeroDocumento = numero.proximoNumero
    }

    const idDocumento = await documentoRepository.createDocumento({ ...dadosDocumento, tenantId })

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

  async createCliente(tenantId: string, dadosCliente: iCliente, dadosDocumento: Documento): Promise<number> {
    const createClienteService = new CreateClienteService()

    const { telefone, cep, logradouro, bairro, cidade, uf } = dadosDocumento

    const cliente = { ...dadosCliente, telefone, cep, logradouro, bairro, cidade, uf }

    return await createClienteService.execute(tenantId, cliente)
  }

}

export default CreateDocumentoService
