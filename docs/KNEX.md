# Knex / Node JS / Typescript
Fonte: [Aprenda Knex.js](https://www.youtube.com/playlist?list=PLbIBj8vQhvm1Qd_APMoozlwHDczjqQaUF)
---


**ORM**: abstrai todas a consultase e joins. Também mapeia os resultados.
**Query Builder**: gera uma API que mapeia as consultas, é um gerador de sql.
---

## Dependencias
npm init -y
nom i knex
npm i mysql2

## Knex
Criar arquivo de configuração do Knex:
```
npx knex init
```

## Migrations
Versionamento da base de dados.
Para qualquer alteração no banco deve ser criado uma **migration**.

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

### Criar SEED
```
npx knex seed:make <nome>
```

### Executar TODAS as SEEDs
```
npx knex seed:run
```

### Executar uma SEED
```
npx knex seed:run --specific <nome>
```
