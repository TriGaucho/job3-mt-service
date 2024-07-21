/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('menus', (tabela) => {
        tabela.increments('id').primary()
        tabela.string('titulo', 160).notNullable()
        tabela.string('icone', 160).notNullable()
        tabela.string('caminho', 160).notNullable()
        tabela.boolean('ativo').defaultTo(true)
        tabela.string('chave', 160).notNullable()
        tabela.unique(['chave'])
        tabela.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('menus')
}