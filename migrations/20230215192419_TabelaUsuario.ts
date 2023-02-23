/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usuario', (tabela) => {
    tabela.increments('idUsuario').primary()
    tabela.string('nome', 168).notNullable()
    tabela.string('tenantId', 14).notNullable()
    tabela.foreign('tenantId')
      .references('empresa.cnpj')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    tabela.string('docUsuario', 11)
    tabela.string('usuario', 104).notNullable()
    tabela.string('email', 104)
    tabela.string('senha', 255).notNullable()
    tabela.string('ambiente', 104).notNullable()
    tabela.integer('nivel').notNullable().unsigned()
    tabela.timestamps(true, true)
    tabela.unique(['docUsuario', 'tenantId', 'usuario'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario')
}
