const router = require('express').Router();



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
router.post('/', validTrip, async (req,res) => {
    try {
      let newTrip = req.body;
    
      const newTripAdded = await Trips.add(newTrip);
      
      res.status(201).json(newTripAdded);
    } catch (err){
      res.status(403).json({message:"Could not add trip", errMessage:err})
    }
  })



//PUT TRIP
router.put('/:id', validTripID, async (req, res) =>{
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
router.delete('/:id', validTripID, async (req,res) => {
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



//NEEDED validate whether trip (to be added) has all the correct parameters
async function validTrip (req, res, next){
    next();
}

module.exports = router;