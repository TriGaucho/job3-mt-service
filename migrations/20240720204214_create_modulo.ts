/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('modulo', (tabela) => {
        tabela.increments('id').primary()
        tabela.string('nomeModulo', 160).notNullable()
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
    return knex.schema.dropTable('modulo')
}