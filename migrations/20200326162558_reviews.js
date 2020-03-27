
exports.up = async knex => {
    await knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.integer('spirit_id').notNullable();
        table.string('review', 500).notNullable().unique();
        table.integer('member_id').notNullable().unique();
        table.foreign('spirit_id')
            .references('id')
            .inTable('spirits')
            .onDelete('cascade')
            .onUpdate('cascade');
        table.foreign('member_id')
            .references('id')
            .inTable('members')
            .onDelete('cascade')
            .onUpdate('cascade');
    })
};

exports.down = async knex => {
    await knex.schema.dropTable('reviews');
};