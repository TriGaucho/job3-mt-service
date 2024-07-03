/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('tipoDocumento', tabela => {
      tabela.string('chave', 32).notNullable()
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.alterTable('tipoDocumento', table => {
      table.dropColumn('chave')
    })
  }
  