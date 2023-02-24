import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ShowAllProdutosService {
  public async execute(tenantId: string): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const produtos = await produtoRepository.showAll(tenantId)

    if (!produtos) throw new AppError('Nenhuma empresa encontrada.')

    return produtos
  }
}

export default ShowAllProdutosService
