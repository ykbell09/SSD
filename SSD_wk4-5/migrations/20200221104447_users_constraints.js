
exports.up = async knex => {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.createTable('users', table => {
        table.increments();
        table.string('first_name', 30).notNullable();
        table.string('email_address', 50).unique().notNullable();
        table.timestamp('created_on').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.createTable('users', table => {
        table.specificType('id', 'serial');
        table.string('first_name', 30);
        table.string('email_address', 50);
        table.timestamp('created_on');
    });
  };
