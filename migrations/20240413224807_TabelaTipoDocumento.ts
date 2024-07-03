/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tipoDocumento', (tabela) => {
      tabela.increments('idTipoDocumento').primary()
      tabela.string('nome', 64).notNullable()
      tabela.boolean('ativo').defaultTo(true)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('tipoDocumento')
  }
  