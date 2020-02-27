
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('gins').del();
  await knex('gins_distillers').truncate();
  // Inserts seed entries
  await knex('gins').insert([
    { id: 1, gin_name: 'Gray Whale', distiller_id: 1, state_located: 'CA', rating: 5 },
    { id: 2, gin_name: 'Amass Dry Gin', distiller_id: 2, state_located: 'CA', rating: 4 },
    { id: 3, gin_name: 'Greenhouse Artisan Gin', distiller_id: 3, state_located: 'TX', rating: 3 },
    { id: 4, gin_name: 'Astral Pacific Gin', distiller_id: 4, state_located: 'CA', rating: 2 }
  ]);
  await knex('gins_distillers').insert([
    { gin_id: 1, distiller_id: 1 },
    { gin_id: 2, distiller_id: 2 },
    { gin_id: 3, distiller_id: 3 },
    { gin_id: 4, distiller_id: 4 },
  ]);
};

