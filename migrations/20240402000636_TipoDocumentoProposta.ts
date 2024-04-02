/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('proposta', tabela => {
    tabela.integer('tipoDocumento').notNullable().unsigned().defaultTo(3)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('proposta', table => {
    table.dropColumn('tipoDocumento')
  })
}
