//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const PORT = process.env.API_DOCKER_PORT || 8080;

var cors = require('cors');

//instantiate server
var server = express();

server.use(cors({ origin: '*'}));

//Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//configure routes
server.get('/',function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Serveur Test</h1>')
});

server.use('/api/', apiRouter);

//Launch server
server.listen(PORT, function(){
    console.log("serveur en marche :)");
});
