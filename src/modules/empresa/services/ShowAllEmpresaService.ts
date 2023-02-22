import AppError from '@shared/erros/AppError'
import Empresa from '../entities/Empresa'
import EmpresaRepository from '../repositories/EmpresaRepository'

class ShowAllEmpresaService {
  public async execute(): Promise<Empresa[]> {
    const empresaRepository = new EmpresaRepository()

    const empresas = await empresaRepository.showAll()

    if (!empresas) throw new AppError('Nenhuma empresa encontrada.')

    return empresas
  }
}

export default ShowAllEmpresaService
