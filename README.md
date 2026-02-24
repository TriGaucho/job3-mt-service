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

Banco de dados:

Criar migartion
npx knex migrate:make

Executar Migration
npx knex migrate:latest

Executar UMA a UMA as Migrations
npx knex migrate:up <nomeMigratio.js>