
exports.up = async knex => {
    await knex.schema.dropTableIfExists('gins');
    await knex.schema.createTable('gins', table => {
        table.increments();
        table.string('gin_name', 50).notNullable();
        table.float('distiller_id').notNullable();
        table.string('state_located', 2).notNullable();
        table.float('rating').notNullable();
        ['created_on', 'updated_on'].forEach(column =>
            table.timestamp(column).defaultTo(knex.fn.now()).notNullable());
        table.unique(['gin_name', 'distiller_id']);
    });
    await knex.schema.dropTableIfExists('distillers');
    await knex.schema.createTable('distillers', table => {
        table.increments();
        table.string('distiller_name', 50).unique().notNullable();
        table.string('website', 30).unique();
        table.integer('phone');
        table.boolean('tours').notNullable();
    });
    await knex.schema.dropTableIfExists('gins_distillers');
    await knex.schema.createTable('gins_distillers', table => {
        table.integer('gin_id');
        table.integer('distiller_id');
        table.foreign('gin_id').references('gins.id').onDelete('cascade');
        table.foreign('distiller_id').references('distillers.id').onDelete('cascade');
        table.primary(['gin_id', 'distiller_id']);
    });
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('gins');
    await knex.schema.createTable('gins', table => {
        table.specificType('id', 'serial');
        table.string('gin_name', 50);
        table.float('distiller_id');
        table.string('state_located', 2);
        table.float('rating');
        ['created_on', 'updated_on'].forEach(column =>
            table.timestamp(column));
    });
    await knex.schema.dropTableIfExists('distillers');
    await knex.schema.createTable('distillers', table => {
        table.specificType('id', 'serial');
        table.string('distiller_name', 50);
        table.string('website', 30);
        table.integer('phone');
        table.boolean('tours');
    });
    await knex.schema.dropTableIfExists('gins_distillers');
    await knex.schema.createTable('gins_distillers', table => {
        table.integer('gin_id');
        table.integer('distiller_id');      
    });
};

