// Get dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const databases = require("./database/");
console.log("server.js userdb require test: " + databases.userDb)
const app = express();
app.paths= new Object();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'publicHTML')));

// Set our api routes

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log("query:" + req.query);
  //check if file exists else emit 404
  var fileToFetch = path.join(__dirname,"publicHTML/",req.path,".html");
  if(fs.exists(fileToFetch)){
    res.sendFile(fileToFetch);
  }
  else{
    res.sendStatus(404);
  }
  
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '80';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));