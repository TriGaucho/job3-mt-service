export default async function InsereTenantId (objeto: any, tenantId: string): Promise<unknown> {
  return objeto.forEach((obj: { tenantId: string }) => (obj.tenantId = tenantId))
}
