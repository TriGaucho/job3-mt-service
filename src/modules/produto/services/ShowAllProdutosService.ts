import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ShowAllProdutosService {
  public async execute(tenantId: string): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const empresa = await produtoRepository.showAll(tenantId)

    if (!empresa) throw new AppError('Nenhuma empresa encontrada.')

    return empresa
  }
}

export default ShowAllProdutosService
