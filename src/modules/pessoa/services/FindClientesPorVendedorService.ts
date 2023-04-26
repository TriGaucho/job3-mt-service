import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"

class FindClientesPorVendedorService {
  public async execute(tenantId: string, docUsuario: string) {
    const pessoaRepository = new PessoaRepository()

    const pessoasLista = await pessoaRepository.findClientesPorVendedor(tenantId, docUsuario)

    if (!pessoasLista) throw new AppError('Nenhum cliente encontrado')

    //TODO criar função reutilizavel para ordenação
    return pessoasLista.sort(function (a, b) {
      if (a.segundoNome > b.segundoNome) {
        return 1;
      }
      if (a.segundoNome < b.segundoNome) {
        return -1;
      }
      return 0;
    })
  }
}

export default FindClientesPorVendedorService
