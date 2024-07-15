export function extrairData(dataHoraStr: string): string {
    // Dividir a string na primeira ocorrência de espaço
    const [data,] = dataHoraStr.split(' ');
    return data;
}