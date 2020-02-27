
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('distillers').del();
  // Inserts seed entries
  await knex('distillers').insert([
    { id: 1, distiller_name: 'Golden State Distillery', website: 'https://www.graywhalegin.com/', phone: null, tours: false },
    { id: 2, distiller_name: 'Amass Spirits', website: 'https://www.amass.com/', phone: null, tours: false },
    { id: 3, distiller_name: 'Dynasty Spirits', website: 'http://www.dynastyspirits.com/', phone: null, tours: false },
    { id: 4, distiller_name: 'The Spirit Guild', website: 'http://www.thespiritguild.com/', phone: 2136431498, tours: true }
  ]);
};
