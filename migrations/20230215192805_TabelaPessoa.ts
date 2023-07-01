/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pessoa', (tabela) => {
    tabela.increments('idPessoa').primary()
    tabela.string('docUsuario', 11)
    tabela.string('nome', 168).notNullable()
    tabela.string('segundoNome', 168)
    tabela.string('cpfCnpj', 14).notNullable()
    tabela.string('rgInscricao', 14)
    tabela.string('email', 168)
    tabela.string('telefone', 24).notNullable()
    tabela.string('cep', 8).notNullable()
    tabela.string('endereco', 168).notNullable()
    tabela.string('bairro', 64).notNullable()
    tabela.string('cidade', 64).notNullable()
    tabela.string('uf', 2).notNullable()
    tabela.string('tenantId', 14).notNullable()
    tabela.foreign('tenantId')
      .references('empresa.cnpj')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.boolean('ativo').defaultTo(true)
    tabela.integer('idTipoPessoa', 10).notNullable().unsigned().defaultTo(1)
    tabela.unique(['cpfCnpj', 'tenantId'])
    tabela.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pessoa')
}
