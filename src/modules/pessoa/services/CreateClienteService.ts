import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"
import Pessoa from "../entities/Pessoa"
import Documento from "@modules/pedido/entities/Documento"
import RemoveMascara from "@shared/utils/removeMascaraCPF"

interface iCliente {
  clienteNome: string
  clienteCpf: string
  telefone: string
  cep: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
  docUsuario?: string
}

class CreateClienteService {
  public async createClienteDocumentoService(tenantId: string, dadosCliente: iCliente): Promise<number>  {
    const { clienteCpf, clienteNome, telefone, cep, docUsuario } = dadosCliente
    const { logradouro, bairro, cidade, uf } = dadosCliente
    
    const cepSemMascara = await RemoveMascara(cep)
    const cpf = await RemoveMascara(clienteCpf)
    const fone = await RemoveMascara(telefone)

    const cliente = { 
      clienteNome, 
      clienteCpf: cpf, 
      telefone: fone, 
      cep: cepSemMascara, 
      logradouro, 
      bairro, 
      cidade, 
      uf,
      docUsuario 
    }

    return await this.execute(tenantId, cliente)
  }

  public async execute(tenantId: string, cliente: iCliente): Promise<number> {
    const pessoaRepository = new PessoaRepository()
    const dadosCliente = await this.transformPessoa(tenantId, cliente)
    const idCliente = await pessoaRepository.create(dadosCliente)
    if (!idCliente) throw new AppError('Não foi possível cadastrar o cliente.')

    return idCliente
  }

  async transformPessoa(tenantId: string, dadosCliente: iCliente): Promise<Pessoa> {
    return {
      nome: dadosCliente.clienteNome,
      segundoNome: dadosCliente.clienteNome,
      cpfCnpj: dadosCliente.clienteCpf,
      telefone: dadosCliente.telefone ? dadosCliente.telefone : '',
      cep: dadosCliente.cep ? dadosCliente.cep : '',
      endereco: dadosCliente.logradouro ? dadosCliente.logradouro : '',
      bairro: dadosCliente.bairro ? dadosCliente.bairro : '',
      cidade: dadosCliente.cidade ? dadosCliente.cidade : '',
      uf: dadosCliente.uf ? dadosCliente.uf : '',
      tenantId: tenantId,
      idTipoPessoa: 2,
      docUsuario: dadosCliente.docUsuario
    }
  }
}

export default CreateClienteService
