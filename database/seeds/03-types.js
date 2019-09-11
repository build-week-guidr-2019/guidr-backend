exports.seed = function(knex) {
  return knex('types').insert([
    {id: 1, type: 'Wild Nature'},
    {id: 2, type: 'Sea Madness'},
    {id: 3, type: 'Dangerous Hiking'},
    {id: 4, type: 'City Walker'}
  ]);
};