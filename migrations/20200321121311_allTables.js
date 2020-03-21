
exports.up = async knex => {
    await knex.schema.dropTableIfExists('distillers');
    await knex.schema.createTable('distillers', table => {
        table.increments('id').primary();
        table.string('distiller_name').unique().notNullable();
        table.timestamp('added_on').defaultTo(knex.fn.now()).notNullable();

    });
    await knex.schema.dropTableIfExists('spirits');
    await knex.schema.createTable('spirits', table => {
        table.increments('id').primary();
        table.string('spirit_name').notNullable();
        table.integer('distiller_id');
        table.unique(['spirit_name', 'distiller_id']);
        table.foreign('distillers')
            .references('distiller_id')
            .onDelete('cascade')
            .onUpdate('cascade');
    })
    await knex.schema.dropTableIfExists('members');
    await knex.schema.createTable('members', table => {
        table.increments('id').primary();
        table.string('email_address', 30).notNullable().unique();
        table.string('password').notNullable().unique();
        table.timestamp('joined').defaultTo(knex.fn.now()).notNullable();
    })
};

exports.down = function (knex) {
    await knex.schema.dropTableIfExists('distillers');
    await knex.schema.dropTableIfExists('spirits');
    await knex.schema.dropTableIfExists('members');

};
