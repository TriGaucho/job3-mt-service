import AppError from "@shared/erros/AppError"
import ProdutoRepository from "../repositories/ProdutoRepository"
import Produto from "../entities/Produto"

class ProdutosPorTabelaService  {
  public async execute(tenantId: string, tipoValor: string): Promise<Produto[]> {
    const produtoRepository = new ProdutoRepository()

    const produtos = await produtoRepository.produtosPorTabela(tenantId, tipoValor)

    if (!produtos) throw new AppError('Nenhum produto para essa tabela.')

    return produtos
  }
}

export default ProdutosPorTabelaService
