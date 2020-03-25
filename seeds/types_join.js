
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('join_st').del()
    .then(function () {
      // Inserts seed entries
      return knex('join_st').insert([
        {spirit_id: 2001, type_id: '1'},
        {spirit_id: 2002, type_id: '2'},
        {spirit_id: 2003, type_id: '1'},
        {spirit_id: 2004, type_id: '1'},
        {spirit_id: 2005, type_id: '2'}
      ]);
    });
};
