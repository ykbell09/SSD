
exports.up = async knex => {
    await knex.schema.dropTableIfExists('spirits');
    await knex.schema.dropTableIfExists('distillers');

    await knex.schema.createTable('distillers', table => {
        table.increments('id').primary();
        table.string('distiller_name').unique().notNullable();
        table.timestamp('added_on').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable('spirits', table => {
        table.increments('id').primary();
        table.string('spirit_name').notNullable();
        table.integer('distiller_id');
        table.unique(['spirit_name', 'distiller_id']);
        table.foreign('distiller_id')
            .references('id')
            .inTable('distillers')
            .onDelete('cascade')
            .onUpdate('cascade');
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('spirits');
    await knex.schema.dropTableIfExists('distillers');

};
