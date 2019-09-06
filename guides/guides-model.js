const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};


//used for endpoint where it's GET for /api/guides
function find() {
  //should give you every guide
  return db('guides');
}

async function findBy(filter) {
  
  return await db('guides').where('username', filter);
}

//used for endpoint where it's a POST for /api/guides
async function add(guide) {
  const [id] = await db('guides').insert(guide);

  return findById(id);
}

//used for endpoint where it's a PUT for /api/guides/:id
async function update(id, changes) {
   await db('guides').where('id', id).update(changes);
   return findById(id);
}


//used for endpoint where it's /api/guides/:id
function findById(id) {
  return db('guides')
    .where({id})
    .first();
}