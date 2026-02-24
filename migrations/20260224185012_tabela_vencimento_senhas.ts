/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('vencimentoSenhas', (tabela) => {
      tabela.increments('id').primary()
      tabela.string('cnpj', 64).notNullable()
      tabela.string('dataVencimento').notNullable()
      tabela.unique(['cnpj'])
      tabela.timestamps(true, true)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('vencimentoSenhas')
  }
  