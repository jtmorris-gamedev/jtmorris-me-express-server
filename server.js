// Get dependencies
const express = require('express');
const path = require('path');
const fs = require('./filesystem/').file;
const http = require('http');
const bodyParser = require('body-parser');
const db = require("./database/");

//set app root:



// Get our API routes
const api = require('./routes/api');

const app = express();

app.dbRoot = __dirname + "/database";
app.dbRoot.schemaRoot
app.restApiRoot = __dirname + "/REST";
app.appRoot = __dirname;



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log("query:" + req.query);
  //check if file exists else emit 404
  var fileToFetch = path.join(__dirname,"dist/",req.path);
  if(fs.ifExists(fileToFetch)){
    res.sendFile(fileToFetch);
  }
  else{
    res.sendStatus(404);
  }
  
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
process.on('exit',function(){
  db.closeConnection();
})
process.on('SIGNIT', function(){
  console.log("control-c-pressed")
  db.closeConnection();
});