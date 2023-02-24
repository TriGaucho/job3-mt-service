/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function up (knex) {
  return knex.schema.createTable('empresa', (tabela) => {
    tabela.increments('idEmpresa').primary()
    tabela.string('cnpj', 14).notNullable().unique()
    tabela.string('razaoSocial', 168).notNullable()
    tabela.string('fantasia', 168)
    tabela.string('email', 168).notNullable()
    tabela.string('telefone', 24).notNullable()
    tabela.string('cep', 8).notNullable()
    tabela.string('bairro', 64).notNullable()
    tabela.string('endereco', 168).notNullable()
    tabela.string('cidade', 64).notNullable()
    tabela.string('uf', 2).notNullable()
    tabela.integer('qtdUsuarios').notNullable().unsigned()
    tabela.boolean('ativo').defaultTo(true)
    tabela.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('empresa')
}
