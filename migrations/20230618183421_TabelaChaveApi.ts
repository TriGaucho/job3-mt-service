/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('chaveApi', (tabela) => {
    tabela.increments('idChaveApi').primary()
    tabela.string('tenantId', 14).notNullable()
    tabela.foreign('tenantId')
    .references('empresa.cnpj')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE')
    tabela.string('nome', 64).notNullable()
    tabela.string('chave', 1500).notNullable()
    tabela.boolean('ativo').defaultTo(true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('chaveApi')
}
