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

## Banco de dados:

### Criando Migrations
```
npx knex migrate:make <nome>
```

### Executar TODAS Migrations
Executa o comando **up** das migrations.
```
npx knex migrate:latest
```

### Executar UMA a UMA as Migrations
Executa o comando **up** das migrations.
```
npx knex migrate:up <nomeMigratio.js>
```

### Desfazer Migrations
Executa o comando **down** das migrations.
```
npx knex migrate:rollback
```

### Desfaz UMA a UMA as Migrations
Executa o comando **down** das migrations.
```
npx knex migrate:down <nomeMigratio.js>
```