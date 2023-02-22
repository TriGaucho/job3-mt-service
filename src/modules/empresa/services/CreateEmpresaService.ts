import AppError from '@shared/erros/AppError'
import Empresa from '../entities/Empresa'
import EmpresaRepository from '../repositories/EmpresaRepository'

class CreateEmpresaService {
  public async execute(empresa: Empresa): Promise<number> {
    const empresaRepository = new EmpresaRepository()

    const novaEmpresa = await empresaRepository.create(empresa)

    if (!novaEmpresa) throw new AppError('Não foi possível cadastrar a empresa.')

    return novaEmpresa
  }
}

export default CreateEmpresaService
