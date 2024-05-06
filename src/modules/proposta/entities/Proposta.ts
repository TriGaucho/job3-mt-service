class Proposta {
  idDocumento?: number;
  numeroDocumento?: number;
  tenantId?: string;
  cliente?: number;
  idUsuario?: number;
  email?: string;
  planoPagamento?: string;
  telefone: string;
  cep: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  observacoes?: string;
  dataValidade?: Date;
  dataAprovada?: Date;
  importado?: boolean;
  tipoDocumento: number;
}

export default Proposta
