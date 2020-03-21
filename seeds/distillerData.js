
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('distillers').del()
    .then(function () {
      // Inserts seed entries
      return knex('distillers').insert([
        { id: 1001, distiller_name: 'The Spirit Guild' },
        { id: 1002, distiller_name: 'Amass' },
        { id: 1003, distiller_name: 'Golden State Distillery' }
      ]);
    });
};
