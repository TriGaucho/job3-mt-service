import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ProdutosPorFiltroService {
  public async execute(tenantId: string, filtro: any): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const produtos = await produtoRepository.produtosPorFiltro(tenantId, filtro)

    if (!produtos) throw new AppError('Nenhum produto encontrado para o filtro.')

    return produtos
  }
}

export default ProdutosPorFiltroService
