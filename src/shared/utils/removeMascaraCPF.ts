export default async function RemoveMascara(ObjCPF: string): Promise<string> {
  return ObjCPF.replace(/\D/g, '');
}
