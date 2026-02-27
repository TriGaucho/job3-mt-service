import VencimentoSenhas from "../entities/VencimentoSenhas"
import VencimentoSenhasRepository from "../repositories/VencimentoSenhasRepository"

class VencimentoSenhasService {
  public async createClienteDocumentoService(dados: VencimentoSenhas): Promise<number>  {
    const vencimentoSenhasRepository = new VencimentoSenhasRepository()
    
    return await vencimentoSenhasRepository.criarOuAtualizar(dados)
  }

  public async consultarVencimentoSenhas(cnpj: string): Promise<VencimentoSenhas | undefined>  {
    const vencimentoSenhasRepository = new VencimentoSenhasRepository()

    return await vencimentoSenhasRepository.consultaPorCNPJ(cnpj)
  }
  
}

export default VencimentoSenhasService
