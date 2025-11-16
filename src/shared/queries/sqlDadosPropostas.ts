export const sqlDadosPropostas = `
SELECT
    pp.idProposta,
    p.numeroDocumento,
    p.tipoDocumento,
    c.nome AS cliente,
    c.idPessoa AS idCliente,
    c.cpfCnpj AS documentoCliente,
    c.cep AS cepCliente,
    c.endereco AS logradouroCliente,
    c.bairro AS bairroCliente,
    c.cidade AS cidadeCliente,
    c.uf AS ufCliente,
    p.observacoes,
    DATE_FORMAT(p.created_at, '%d/%m/%Y') AS dataProposta,
    DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS dataEmissao,
    p.email,
    p.telefone,
    p.cep AS cepEntrega,
    p.logradouro AS logradouroEntrega,
    p.bairro AS bairroEntrega,
    p.cidade AS cidadeEntrega,
    p.uf AS ufEntrega,
    CASE WHEN p.importado = 1 THEN 'SIM' ELSE 'NÃO' END AS importado,
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
		produtosProposta pp
        INNER JOIN proposta AS p ON p.idProposta = pp.idproposta
        INNER JOIN pessoa AS c ON c.idPessoa = p.cliente
        LEFT JOIN usuario AS v ON v.idUsuario = p.idUsuario
        INNER JOIN produto AS pr ON pr.idProduto = pp.idProduto
    `
