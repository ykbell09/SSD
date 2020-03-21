
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('spirits').del()
    .then(function () {
      // Inserts seed entries
      return knex('spirits').insert([
        { id: 2001, spirit_name: 'Amass Dry Gin', distiller_id: '1002' },
        { id: 2002, spirit_name: 'Amass Botanic Vodka', distiller_id: '1002' },
        { id: 2003, spirit_name: 'Grey Whale Gin', distiller_id: '1003' },
        { id: 2004, spirit_name: 'Astral Pacific Gin', distiller_id: '1001' },
        { id: 2005, spirit_name: 'Vapid Vodka', distiller_id: '1001' },
      ]);
    });
};
