const router = require('express').Router();



const Types = require('./types-model.js');

//const validate = require( shared validation middleware)

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


module.exports = router;