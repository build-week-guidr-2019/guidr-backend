

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


//added this to test that server was running.
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running!' });
  });


module.exports = server;