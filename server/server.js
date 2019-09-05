const express = require('express');
const server = express();

server.use(express.json());
server.get('/' , (req , res) => {
    res.send('<h1>Back End Sprint Build- Guidr</h1>')
})

module.exports = server;