exports.up = async knex => {
    await knex.schema.dropTableIfExists('members');
    await knex.schema.createTable('members', table => {
        table.increments('id').primary();
        table.string('email_address', 30).notNullable().unique();
        table.string('password').notNullable().unique();
        table.timestamp('joined').defaultTo(knex.fn.now()).notNullable();
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('members');
};