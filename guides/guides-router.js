const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

//Authentication middleware
const validate = require('../auth/auth-middleware');

const Guides = require('./guides-model.js');

//const validate = require( shared validation middleware)

router.get('/', async (req, res) =>{
  try {
    const guides = await Guides.find();
    res.status(200).json(guides);

  }catch(err){
    res.status(500).json({message:"Trouble getting guides", errMessage:err});
  }
  
})

//Get specific guide by id
router.get('/:id', validGuideID, async (req,res) => {
  try {
    const guideID = req.params.id;
    const guideBody = await Guides.findById(guideID);
    res.status(200).json(guideBody);
  } catch(err){
    res.status(500).json({message:"Trouble getting specific guide by ID", errMessage:err});
  }
})

//get the trips for a guide given ID

router.get('/:id/trips', validGuideID, async (req,res)=>{
  try{
    const guideID = req.params.id;
    const guidesTrips = await Guides.findTrips(guideID);
    res.status(200).json(guidesTrips);
  }
  catch(err){
    res.status(500).json({message:"Trouble getting guide's trips", errMessage:err});
  }
})




//POST/Register guide 

router.post('/register', validGuide, async (req,res) => {
  try {
    let newGuide = req.body;
    
    const hash = bcrypt.hashSync(newGuide.password, 11);
    newGuide.password = hash;

    const newGuideToAdd = await Guides.add(newGuide);
    
    res.status(201).json(newGuideToAdd);
  } catch (err){
    res.status(403).json({message:"Could not add ", errMessage:err})
  }
})

//PUT endpoint only tagline, age, experience 

router.put('/:id', validate, validGuideID, async (req, res) =>{
  try {
    let guideInfo = req.body;
    let guideID = req.params.id;
    
    const updatedGuide = await Guides.update(guideID, guideInfo);

    res.status(201).json(updatedGuide);

  } catch(err) {
    res.status(403).json({message:"Cannot update ", errMessage:err})
  }
});



//Middleware 

async function validGuide( req, res, next) {
  const {username, password} = req.body; 
  try{
    if (username && password){
      next();

      //A non-implemented test to see if a guide with such username already exists
      // console.log("inside if")
      // const existingGuide = await Guides.findBy(usermame);
      
      // if(existingGuide){
      //   res.status(403).json({message:"Username already taken"});
      // } else {
      //   next();
      // }
      
    } else {
      res.status(403).json({message:"You need a username and/or password!"})
    }
  } catch (err) {
    res.status(500).json({message:"cannot validate", errMessage:err})
  }
}

async function validGuideID (req, res, next){
  const {id} = req.params;
  try {
    const guide = await Guides.findById(id);

    if (guide){
      next();
    } else {
      res.status(401).json({message:"That guide does not exist!"});
    }
  } catch (err) {
    res.status(500).json({message:"cannot validate", errMessage:err})
  }
}

module.exports = router;