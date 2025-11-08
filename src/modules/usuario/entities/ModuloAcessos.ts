import { IModuloAcesso } from "@shared/interfaces/modulosAcesso.interface";
import { TModulo } from "@shared/types/modulos.type";

export class ModuloAcesso implements IModuloAcesso{
    chave: TModulo;
}