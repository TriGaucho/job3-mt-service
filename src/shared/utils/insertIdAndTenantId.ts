export default async function InsertIdAndTenantId(
  coluna: string,
  id: number,
  tenantId: string,
  listaDados: any[]): Promise<any[]> {
  listaDados.forEach((item) => {
    item[coluna] = id
    item.tenantId = tenantId
  })
  return listaDados
}
