/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus_empresas', (tabela) => {
        tabela.integer('idMenu').notNullable().unsigned()
        tabela.foreign('idMenu')
          .references('menus.id')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
        tabela.string('tenantId', 14).notNullable()
        tabela.foreign('tenantId')
          .references('empresa.cnpj')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
        tabela.timestamps(true, true)
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menus_empresas')
};
