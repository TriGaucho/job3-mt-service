import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"
import Pessoa from "../entities/Pessoa"

interface iRequest {
  tenantId: string
  cpfCnpj: string
}

interface iResponse {
  clienteNome: string
  clienteCpf: string
  clienteFone: string
}
class FindClienteService {
  public async execute({ tenantId, cpfCnpj }: iRequest): Promise<iResponse> {
    const pessoaRepository = new PessoaRepository()

    const pessoa = await pessoaRepository.findCliente(tenantId, cpfCnpj)

    if (!pessoa) throw new AppError('Nenhum cliente encontrado')

    return this.transformPessoa(pessoa)
  }

  async transformPessoa(pessoa: Pessoa): Promise<iResponse> {
    return {
      clienteNome: pessoa.nome,
      clienteCpf:pessoa.cpfCnpj,
      clienteFone:pessoa.telefone,
    }
  }
}

export default FindClienteService
