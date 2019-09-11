const db = require('../database/dbConfig.js');


module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};


//used for endpoint where it's GET for /api/trips
function find() {
  //should give you every trip

  //db('trips').join('guides', 'guides.id', 'trips.guide_id')
  return db('trips')
        .join('guides', 'guides.id', 'trips.guide_id')
        .join('types', 'types.id', 'trips.type_id')
        .select('trips.id as TripID',
        'guides.username as GuideName', 
        'trips.title',
        'trips.description',
        'trips.professional',
        'types.type',
        'trips.duration',
        'trips.date');
}

function findBy(filter) {
  
  return db('trips').where(filter);
}

//used for endpoint where it's a POST for /api/trips
async function add(trip) {
  const [id] = await db('trips').insert(trip);

  return findById(id);
}

//used for endpoint where it's a PUT for /api/trips/:id
async function update(id, changes) {
   await db('trips').where('id', id).update(changes);
   return findById(id);
}


//used for endpoint where it's a DELETE for /api/trips/1
function remove(id){
    return db('trips').where('id',id).del();
}

//used for endpoint where it's /api/trips/:id
function findById(id) {
  return db('trips')
    .join('guides', 'guides.id', 'trips.guide_id')
    .join('types', 'types.id', 'trips.type_id')
    .select('trips.id as TripID',
        'guides.username as GuideName', 
        'trips.title',
        'trips.description',
        'trips.professional',
        'types.type',
        'trips.duration',
        'trips.date')
    .where('trips.id', id)
    .first();
    
}


