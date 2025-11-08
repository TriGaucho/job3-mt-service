export function transformarArrayEmObjeto(array: any[]) {
    return array.reduce((obj, item) => {
        obj[item.chave] = true;
        return obj;
    }, {});
}