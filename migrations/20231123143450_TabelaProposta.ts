/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('proposta', (tabela) => {
    tabela.increments('idProposta').primary()
    tabela.integer('numeroProposta').unsigned()
    tabela.string('tenantId', 14).notNullable()
    tabela.integer('cliente').notNullable().unsigned()
    tabela.foreign('cliente')
      .references('pessoa.idPessoa')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.integer('idUsuario', 11).unsigned()
    tabela.foreign('idUsuario')
    .references('usuario.idUsuario')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE')
    tabela.string('email', 168)
    tabela.string('planoPagamento', 48)
    tabela.string('telefone', 24)
    tabela.string('cep', 8)
    tabela.string('logradouro', 168)
    tabela.string('bairro', 64)
    tabela.string('cidade', 64)
    tabela.string('uf', 2)
    tabela.string('observacoes', 256)
    tabela.date('dataValidade')
    tabela.date('dataAprovada')
    tabela.timestamps(true, true)
    tabela.unique(['numeroProposta', 'tenantId'])
    tabela.boolean('importado').defaultTo(false)
  })
}

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('proposta')
}
