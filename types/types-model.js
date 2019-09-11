const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,

  
};


//used for endpoint where it's GET for /api/types
function find() {
  //should give you every type
  return db('types');
}

function findBy(filter) {
  return db('types').where(filter);
}

//used for endpoint where it's a POST for /api/types
async function add(type) {
  const [id] = await db('types').insert(type);
  return findById(id);
}


//used for endpoint where it's /api/types/:id
function findById(id) {
  return db('types')
    .where({id})
    .first();
}
