import AppError from '@shared/erros/AppError'
import Empresa from '../entities/Empresa'
import EmpresaRepository from '../repositories/EmpresaRepository'

class ShowEmpresaService {
  public async execute(idEmpresa: string): Promise<Empresa> {
    const empresaRepository = new EmpresaRepository()

    const empresa = await empresaRepository.show(parseInt(idEmpresa))

    if (!empresa) throw new AppError('Nenhuma empresa encontrada.')

    return empresa
  }
}

export default ShowEmpresaService
