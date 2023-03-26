import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"
import Pessoa from "../entities/Pessoa"

interface iCliente {
  clienteNome: string
  clienteCpf: string
  telefone: string
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
}

class CreateClienteService {
  public async execute(tenantId: string, cliente: iCliente, dadosEndereco: any): Promise<number> {
    const pessoaRepository = new PessoaRepository()

    const dadosCliente = await this.transformPessoa(tenantId, cliente)

    const idCliente = await pessoaRepository.create(dadosCliente)

    if (!idCliente) throw new AppError('Não foi possível cadastrar o cliente.')

    return idCliente
  }

  async transformPessoa(tenantId: string, dadosCliente: iCliente): Promise<Pessoa> {
    return {
      nome: dadosCliente.clienteNome,
      cpfCnpj: dadosCliente.clienteCpf,
      telefone: dadosCliente.telefone,
      cep: dadosCliente.cep,
      endereco: dadosCliente.logradouro,
      bairro: dadosCliente.bairro,
      cidade: dadosCliente.cidade,
      uf: dadosCliente.uf,
      tenantId: tenantId,
      idTipoPessoa: 2,
    }
  }
}

export default CreateClienteService
