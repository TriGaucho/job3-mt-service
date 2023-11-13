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
  public async execute(dadosDocumento: Documento, produtosDocumento: ProdutosDocumento[], dadosCliente: iCliente, tenantId: string): Promise<number> {
    const documentoRepository = new DocumentoRepository()
    const proximoNumeroService = new ProximoNumeroService()

    if (dadosCliente) {
      dadosDocumento.cliente = await this.createCliente(tenantId, dadosCliente, dadosDocumento)
    }

    const numero = await proximoNumeroService.execute(tenantId)
    dadosDocumento.numeroDocumento = !numero.proximoNumero ? 1 : numero.proximoNumero

    const cepSemMascara = await RemoveMascara(dadosDocumento.cep)
    const foneSemMascara = await RemoveMascara(dadosDocumento.telefone)

    const idDocumento = await documentoRepository.createDocumento({
      ...dadosDocumento,
      cep: cepSemMascara,
      telefone: foneSemMascara,
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

  async createCliente(tenantId: string, dadosCliente: iCliente, dadosDocumento: Documento): Promise<number> {
    const createClienteService = new CreateClienteService()

    const { clienteCpf, clienteNome } = dadosCliente
    const { telefone, cep, logradouro, bairro, cidade, uf } = dadosDocumento
    const cepSemMascara = await RemoveMascara(cep)
    const cpf = await RemoveMascara(clienteCpf)
    const fone = await RemoveMascara(telefone)
    const cliente = { clienteNome, clienteCpf: cpf, telefone: fone, cep: cepSemMascara, logradouro, bairro, cidade, uf }

    return await createClienteService.execute(tenantId, cliente)
  }

}

export default CreateDocumentoService
