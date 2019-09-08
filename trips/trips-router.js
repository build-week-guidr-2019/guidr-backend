const router = require('express').Router();

//Authentication middleware
const validate = require('../auth/auth-middleware');

const Trips = require('./trips-model.js');

//const validate = require( shared validation middleware)

router.get('/', async (req, res) =>{
  try {
    const trips = await Trips.find();
    res.status(200).json(trips);

  }catch(err){
    res.status(500).json({message:"Trouble getting trips", errMessage:err});
  }
  
})

//Get specific trip by id
router.get('/:id', validTripID, async (req,res) => {
  try {
    const tripID = req.params.id;
    const tripBody = await Trips.findById(tripID);
    res.status(200).json(tripBody);
  } catch(err){
    res.status(500).json({message:"Trouble getting specific trip by ID", errMessage:err});
  }
})


//POST trip 
router.post('/', validate, validTrip, async (req,res) => {
    try {
      let newTrip = req.body;
    
      const newTripAdded = await Trips.add(newTrip);
      
      res.status(201).json(newTripAdded);
    } catch (err){
      res.status(403).json({message:"Could not add trip", errMessage:err})
    }
  })



//PUT TRIP
router.put('/:id', validate, validTripID, async (req, res) =>{
  try {
    let tripInfo = req.body;
    let tripID = req.params.id;
    
    const updatedTrip = await Trips.update(tripID, tripInfo);

    res.status(201).json(updatedTrip);

  } catch(err) {
    res.status(403).json({message:"Cannot update ", errMessage:err})
  }
});

// DELETE trip
router.delete('/:id', validate, validTripID, async (req,res) => {
    try {
        let tripID = req.params.id;
        const deletionAttempt = await Trips.remove(tripID);
        res.status(200).json({message:"Trip deleted successfully", recordsDeleted: deletionAttempt})
    } catch(err){
        res.status(403).json({message:"Cannot delete", errMessage:err})
    }
})



//Middleware 

async function validTripID (req, res, next){
  const {id} = req.params;
  try {
    const trip = await Trips.findById(id);

    if (trip){
      next();
    } else {
      res.status(401).json({message:"Trip does not exist!"});
    }
  } catch (err) {
    res.status(500).json({message:"cannot validate", errMessage:err})
  }
}

//validate whether trip (to be added) has all the correct parameters
function validTrip (req, res, next){
    //if (!req.body.guide_id || !req.body.title || !req.body.description || req.body.professional === null || !req.body.type_id || !req.body.duration || !req.body.date){
    if(Object.values(req.body).length < 7){
        res.status(404).json({message: 'Trip is missing some data'});
    } else {
        next();
    }
    
}

module.exports = router;