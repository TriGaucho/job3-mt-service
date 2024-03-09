import AppError from '@shared/erros/AppError'
import Proposta from '../entities/Proposta'
import ProdutosProposta from '../entities/ProdutosProposta'
import PropostaRepository from '../repositories/PropostaRepository'
import InsertIdAndTenantId from '@shared/utils/insertIdAndTenantId';

class CreatePropostaService {
  public async execute(proposta: Proposta, produtos: ProdutosProposta[], tenantId: string) {
    const propostaRepository = new PropostaRepository();
    const dadosProposta = {...proposta, tenantId}
    const idProposta = await propostaRepository.createProposta(dadosProposta);

    if (!idProposta) throw new AppError('Não foi possível criar o a proposta.')

    const produtosPropostaAux = await InsertIdAndTenantId('idProposta',idProposta, tenantId, produtos);
    const produtosProposta = await propostaRepository.createProdutosProposta(produtos, idProposta);

    return idProposta;
  }
}

export default CreatePropostaService
