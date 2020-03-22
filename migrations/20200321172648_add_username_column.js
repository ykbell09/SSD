
exports.up = async knex => {
    await knex.schema.alterTable('members', table => {
        table.string('username', 20).notNullable().defaultTo('friend');
    })
};

// table is not recognizing notNullable and defaultTo when running migration.... 

exports.down = async knex => {
    await knex.schema.alterTable('members', table => {
        table.dropColumn('username');
    });
  
};
