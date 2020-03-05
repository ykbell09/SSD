
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').truncate();
  // Inserts seed entries
  await knex('users').insert([
    { id: 10001, first_name: 'Emily', email_address: 'Emily@fakemail.com' },
    { id: 10002, first_name: 'Frank', email_address: 'Frank@furter.com' },
  ]);
};
