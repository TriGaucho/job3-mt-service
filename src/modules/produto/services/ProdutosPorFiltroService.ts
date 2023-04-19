import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ProdutosPorFiltroService {
  public async execute(tenantId: string, filtro: any): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const produtos = await produtoRepository.produtosPorFiltro(tenantId, filtro)

    if (!produtos) throw new AppError('Nenhum produto encontrado para o filtro.')

    return produtos.sort(function (a, b) {
      if (a.descricao > b.descricao) {
        return 1;
      }
      if (a.descricao < b.descricao) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  }
}

export default ProdutosPorFiltroService
