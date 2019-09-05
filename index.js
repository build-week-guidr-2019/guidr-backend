require('dotenv').config();
const server = require('./server/server');


const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

server.listen(port , host , (req , res) => {
    console.log(`Server listenning on port ${port}`);
})
