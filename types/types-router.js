const router = require('express').Router();



const Types = require('./types-model.js');

//Authentication middleware
const validate = require('../auth/auth-middleware');

router.get('/', async (req, res) =>{
  try {
    const types = await Types.find();
    res.status(200).json(types);

  }catch(err){
    res.status(500).json({message:"Trouble getting types", errMessage:err});
  }
  
})

//Get specific type by id
router.get('/:id', validTypeID, async (req,res) => {
  try {
    const typeID = req.params.id;
    const typeBody = await Types.findById(typeID);
    res.status(200).json(typeBody);
  } catch(err){
    res.status(500).json({message:"Trouble getting specific type by ID", errMessage:err});
  }
})


//POST type 
router.post('/', validate, validType, async (req,res) => {
    try {
      let newType = req.body;
    
      const newTypeAdded = await Types.add(newType);
      
      res.status(201).json(newTypeAdded);
    } catch (err){
      res.status(403).json({message:"Could not add type", errMessage:err})
    }
  })



//Middleware for Validation

async function validTypeID (req, res, next){
  const {id} = req.params;
  try {
    const type = await Types.findById(id);

    if (type){
      next();
    } else {
      res.status(401).json({message:"Type does not exist!"});
    }
  } catch (err) {
    res.status(500).json({message:"cannot validate", errMessage:err})
  }
}

//NEEDED validate whether type has all the correct parameters before it is added
function validType (req, res, next){
    if (!req.body.type){
      res.status(404).json({message:"Type is missing some data"});
    } else {
      next();
    }
}

module.exports = router;