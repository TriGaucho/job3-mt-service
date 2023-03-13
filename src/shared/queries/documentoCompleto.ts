export const documentosSql = `
SELECT
    pp.idDocumento,
    p.numeroDocumento AS numeroPedido,
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
    p.planoPagamento,
    p.tipoDocumento
FROM
		produtosDocumento pp
        INNER JOIN documento AS p ON p.idDocumento = pp.idDocumento
        INNER JOIN pessoa AS c ON c.idPessoa = p.cliente
        LEFT JOIN usuario AS v ON v.docUsuario = p.docUsuario
        INNER JOIN produto AS pr ON pr.idProduto = pp.idProduto
    `
