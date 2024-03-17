# API Job3

Backend de emissão de pedidos e integração com ERP Job3 (legado).

## Modulos

* Empresa
* Legado Job3
* Pedido
* Pessoa
* Plano de Pagamento
* Produto
* Usuario
* Proposta

## Requisitos

* MongoDb
* MySql
* Node V18

## Erro conexão MySql DBeaver
Para usuários do DBeaver:

* Clique com o botão direito na sua conexão, escolha "Editar Conexão"
* Na tela "Configurações de conexão" (tela principal), clique em "Editar configurações do driver"
* Clique em "Propriedades da conexão"
* Clique com o botão direito na área "propriedades do usuário" e escolha "Adicionar nova propriedade"
* Adicione duas propriedades: "useSSL" e "allowPublicKeyRetrieval"
* Defina seus valores como "false" e "true" clicando duas vezes na coluna "value"