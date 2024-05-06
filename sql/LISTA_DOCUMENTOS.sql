SELECT
    idDocumento,
    p.nome as cliente,
    tipoDocumento,
    td.nome AS documento,
    CASE
        WHEN importado = 1 THEN 'Sim'
        ELSE 'Não'
    END AS importado
FROM
    documento d
    INNER JOIN pessoa p ON p.idPessoa = d.cliente
    INNER JOIN tipoDocumento td ON d.tipoDocumento = td.idTipoDocumento;