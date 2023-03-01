export default {
  proximoNumero: `
    select max(numeroPedido + 1 ) as proximoNumero from pedido
  `
}
