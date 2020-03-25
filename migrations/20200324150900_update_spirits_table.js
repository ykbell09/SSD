// adds categoreies and join table for spirits

exports.up = async knex => {
    await knex.schema.createTable('types', table => {
        table.increments('id').primary();
        table.string('spirit_type', 20).notNullable().unique();
    });
    await knex.schema.createTable('join_st', table => {
        table.integer('spirit_id').notNullable().unique();
        table.integer('type_id').notNullable();
        table.foreign('spirit_id')
            .references('id')
            .inTable('spirits')
            .onDelete('cascade')
            .onUpdate('cascade');
    });
};

exports.down = async knex =>  {
    await knex.schema.dropTable('types');
    await knex.schema.dropTable('join_st')
};
