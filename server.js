require('./connections/connection.mongo')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

//Error object after hiting the wrong endpoint
let aboutApp = {
    name: 'Past Questions App',
    version: 'Version 1.0',
    developer_mail: 'musjib999@gmail.com',
    author: 'Musa Jibril'
}


const courseRoute = require('./routes/route.course')();
server.use('/api/v1/', courseRoute);

//get all non existing endpoints
server.get('*', (req, res) => {
    res.status(400).json({ status: 'Failed', payload: aboutApp, message: 'End point does not exist' });
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
});


module.exports.server = server;