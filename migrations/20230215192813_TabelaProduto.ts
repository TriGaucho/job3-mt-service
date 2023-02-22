/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('produto', (tabela) => {
    tabela.increments('idProduto').primary()
    tabela.string('tenantId', 14).notNullable()
    tabela.foreign('tenantId')
      .references('empresa.cnpj')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.string('codigo', 160).notNullable()
    tabela.string('descricao', 240).notNullable()
    tabela.string('unidade', 80).notNullable()
    tabela.decimal('valorUnidade', 10.2).nullable().unsigned()
    tabela.decimal('valorAtacado', 10.2).nullable().unsigned()
    tabela.decimal('valorRevenda', 10.2).nullable().unsigned()
    tabela.decimal('valorTabela4', 10.2).nullable().unsigned()
    tabela.unique(['codigo', 'tenantId'])
    tabela.boolean('ativo').defaultTo(true)
    tabela.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('produto')
}
