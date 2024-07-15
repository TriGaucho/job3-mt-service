import { somenteNumeros } from "./apenas-numeros.helper";

export function mascaraTelefone(telefone: string): string {
    const numeros = somenteNumeros(telefone);

    const telefoneCompleto = numeros.padStart(11, '0');

    const telefoneMascara = telefoneCompleto.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return telefoneMascara;
}

export function mascaraCEP(cep: string): string {
    const numeros = somenteNumeros(cep);

    const cepCompleto = numeros.padStart(8, '0');

    const cepMascara = cepCompleto.replace(/(\d{5})(\d{3})/, '$1-$2');

    return cepMascara;

}