/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('config', (tabela) => {
    tabela.increments('idConfig').primary()
    tabela.string('ambiente', 3).notNullable()
    tabela.string('release', 8).notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('config')
}
