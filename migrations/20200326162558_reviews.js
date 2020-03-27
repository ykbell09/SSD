
exports.up = async knex => {
    await knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.integer('spirit_id').notNullable();
        table.string('review', 500).notNullable().unique();
        table.integer('member_id').notNullable();
        table.foreign('spirit_id')
            .references('id')
            .inTable('spirits')
            .onDelete('cascade')
            .onUpdate('cascade');
    })
};

exports.down = async knex => {
    await knex.schema.dropTable('reviews');
};