/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('proposta', table => {
        table.renameColumn('numeroProposta', 'numeroDocumento')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('proposta', table => {
        table.renameColumn('numeroDocumento', 'numeroProposta')
    })
}
