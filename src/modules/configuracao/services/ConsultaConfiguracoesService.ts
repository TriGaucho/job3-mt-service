import AppError from '@shared/erros/AppError'
import Configs from '../entities/Configs'
import ConfiguracaoRepository from '../repositories/ConfiguracaoRepository'

class ConsultaConfiguracoesService {
  public async execute(): Promise<Configs[]> {
    const configuracaoRepository = new ConfiguracaoRepository()

    const dados = await configuracaoRepository.show()

    if (!dados) throw new AppError('Não foi possível obter os dados de configuração.')

    return dados
  }
}

export default ConsultaConfiguracoesService
