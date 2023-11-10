/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('notaProcessada', (tabela) => {
      tabela.increments('idNotaProcessada').primary()
      tabela.integer('tipoAmbiente').notNullable().unsigned()
      tabela.string('versaoAplicacao', 32)
      tabela.string('chaveNfe', 44)
      tabela.date('dataRecebimento')
      tabela.string('numeroProtocolo', 32)
      tabela.string('digestValue', 32)
      tabela.string('codigoStatus', 8)
      tabela.string('motivo')
      tabela.string('versao', 8)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('notaProcessada')
  }
  