/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('documentoGerado', (tabela) => {
      tabela.increments('idDocumentoGerado').primary()
      tabela.string('documento', 32)
      tabela.string('numero', 16)
      tabela.string('chaveNfe', 44)
      tabela.string('urlDanfe')
      tabela.string('urlXml')

    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('documentoGerado')
  }
  