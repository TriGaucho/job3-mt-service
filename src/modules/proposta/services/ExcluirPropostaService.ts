import PropostaRepository from '../repositories/PropostaRepository';
interface iCliente {
  clienteNome: string
  clienteCpf: string
}

class ExcluirPropostaService {
  public async execute(dados: {idProposta: number, tenantId: string}) {
    const propostaRepository = new PropostaRepository();
    const { idProposta, tenantId } = dados
    const resultado = await propostaRepository.exclusaoLogica({ tenantId, idProposta })
    
    return resultado;
  }
}
  
export default ExcluirPropostaService
