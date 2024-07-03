/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('produtosProposta', (tabela) => {
    tabela.integer('idProposta').notNullable().unsigned()
    tabela.foreign('idProposta')
      .references('proposta.idProposta')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.integer('idProduto').unsigned().notNullable()
    tabela.foreign('idProduto')
      .references('produto.idProduto')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.string('tenantId', 14).notNullable()
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
  return knex.schema.dropTable('produtosProposta')
}
