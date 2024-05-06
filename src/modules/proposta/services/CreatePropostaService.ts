import AppError from '@shared/erros/AppError'
import Proposta from '../entities/Proposta'
import ProdutosProposta from '../entities/ProdutosProposta'
import PropostaRepository from '../repositories/PropostaRepository'
import InsertIdAndTenantId from '@shared/utils/insertIdAndTenantId';
import CreateClienteService from '@modules/pessoa/services/CreateClienteService';
import RemoveMascara from '@shared/utils/removeMascaraCPF';
interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class CreatePropostaService {
  public async execute(proposta: Proposta, produtos: ProdutosProposta[], dadosCliente: iCliente, tenantId: string, docUsuario: string) {
    const propostaRepository = new PropostaRepository();
    const createClienteService = new CreateClienteService()
    
    if (dadosCliente && proposta.cliente === null) {
      const { telefone, cep, logradouro, bairro, cidade, uf } = proposta

      const dadosClienteNovo = {
        ...dadosCliente,
        docUsuario,
        telefone, cep, logradouro, bairro, cidade, uf
      }

      proposta.cliente = await createClienteService.createClienteDocumentoService(tenantId, dadosClienteNovo)
    }

    const dadosProposta = { 
      ...proposta, 
      tenantId,
      cep:  await RemoveMascara(proposta.cep),
      telefone: await RemoveMascara(proposta.telefone),
     }
     
    const idProposta = await propostaRepository.createProposta(dadosProposta);

    if (!idProposta) throw new AppError('Não foi possível criar o a proposta.')

    const produtosPropostaAux = await InsertIdAndTenantId('idProposta', idProposta, tenantId, produtos);
    const produtosProposta = await propostaRepository.createProdutosProposta(produtos, idProposta);

    return idProposta;
  }
}

export default CreatePropostaService
