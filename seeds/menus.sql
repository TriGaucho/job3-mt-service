INSERT INTO menus
(titulo, icone, caminho, ativo, chave)
VALUES('Proposta', 'mdi-archive', '/proposta', 1, 'PROPOSTA'),
('Pedido', 'mdi-file-document-outline', '/pedido', 1, 'PEDIDO');

INSERT INTO modulo
(nomeModulo, chave)
VALUES ('Exibir Código Produto', 'EXIBIR_CODIGO_PRODUTOS');


-- EXZEMPLO DE INSERT PARA MENU EMPRESA
insert into menus_empresas (idMenu, tenantId)
values (1, '07720423000125'),
(2, '07720423000125');

