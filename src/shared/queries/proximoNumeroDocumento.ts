export default {
  proximoNumero: `
    select max(numeroDocumento + 1 ) as proximoNumero from documento
  `
}
