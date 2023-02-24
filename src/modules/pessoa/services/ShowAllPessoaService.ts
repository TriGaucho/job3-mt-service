import AppError from "@shared/erros/AppError"
import PessoaRepository from "../repositories/PessoaRepository"
import Pessoa from "../entities/Pessoa"

class ShowAllPessoaService {
  public async execute(tenantId: string): Promise<Pessoa[]> {
    const pessoaRepository = new PessoaRepository()

    const pessoas = await pessoaRepository.showAll(tenantId)

    if (!pessoas) throw new AppError('Nenhuma empresa encontrada.')

    return pessoas
  }
}

export default ShowAllPessoaService
