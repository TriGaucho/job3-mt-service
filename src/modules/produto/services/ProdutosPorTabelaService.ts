import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ProdutosPorTabelaService  {
  public async execute(tenantId: string, tipoValor: string): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const produtos = await produtoRepository.produtosPorTabela(tenantId, tipoValor)

    if (!produtos) throw new AppError('Nenhum produto para essa tabela.')

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

export default ProdutosPorTabelaService
