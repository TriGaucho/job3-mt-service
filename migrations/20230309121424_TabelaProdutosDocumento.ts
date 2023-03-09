/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('produtosDocumento', (tabela) => {
    tabela.integer('idDocumento').notNullable().unsigned()
    tabela.foreign('idDocumento')
      .references('documento.idDocumento')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.integer('idProduto').unsigned().notNullable()
    tabela.foreign('idProduto')
      .references('produto.idProduto')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.string('tenantId', 14).notNullable()
    tabela.foreign('tenantId')
      .references('empresa.cnpj')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.string('observacao', 256)
    tabela.decimal('quantidade', 10.2).notNullable().unsigned()
    tabela.decimal('valorUnidade', 10.2).notNullable().unsigned()
    tabela.decimal('desconto', 10.2).notNullable().unsigned()
    tabela.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('produtosDocumento')
}
