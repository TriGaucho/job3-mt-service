export default {
  pedidos: `SELECT
    pp.idPedido,
    p.numeroPedido,
    c.nome AS cliente,
    c.idPessoa AS idCliente,
    c.cpfCnpj AS documentoCliente,
    c.cep AS cepCliente,
    c.endereco AS logradouroCliente,
    c.bairro AS bairroCliente,
    c.cidade AS cidadeCliente,
    c.uf AS ufCliente,
    p.observacoes,
    DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS dataEmissao,
    DATE_FORMAT(p.dataPrevisaoEntrega, '%d/%m/%Y') AS dataPrevisaoEntrega,
    p.email,
    p.telefone,
    p.cep AS cepEntrega,
    p.logradouro AS logradouroEntrega,
    p.bairro AS bairroEntrega,
    p.cidade AS cidadeEntrega,
    p.uf AS ufEntrega,
    p.importado,
    v.idUsuario AS idVendedor,
    v.nome AS vendedor,
    v.docUsuario AS documentoVendedor,
    pr.codigo,
    pr.descricao,
    pp.idProduto,
    pp.observacao,
    pp.quantidade,
    pp.valorUnidade,
    pp.desconto,
    p.planoPagamento
  FROM
    produtosPedido pp,
    pedido p,
    pessoa c,
    usuario v,
    produto pr
  WHERE
    pp.idPedido = p.idPedido
    AND pp.idProduto = pr.idProduto
    AND p.cliente = c.idPessoa
    AND p.docUsuario = v.docUsuario
    `
}
