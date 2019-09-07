

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//Routers
const guidesRouter = require('../guides/guides-router.js');
const authRouter = require('../auth/auth-router.js');
const tripsRouter = require('../trips/trips-router.js');
const typesRouter = require('../types/types-router.js')


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


//Routes
server.use('/api/guides', guidesRouter);
server.use('/api/login', authRouter);
server.use('/api/trips',tripsRouter);
server.use('/api/types',typesRouter);


//added this to test that server was running.
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running!' });
  });


module.exports = server;