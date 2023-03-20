import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"

class FindClientesPorVendedorService {
  public async execute(tenantId: string, docUsuario: string) {
    const pessoaRepository = new PessoaRepository()
    const pessoasLista = await pessoaRepository.findClientesPorVendedor(tenantId, docUsuario)

    if (!pessoasLista) throw new AppError('Nenhum cliente encontrado')

    return pessoasLista
  }
}

export default FindClientesPorVendedorService
