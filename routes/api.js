const express = require('express');
const router = express.Router();
var db = require(__dirname.substr(0,(__dirname.lastIndexOf("\\"))) + ("\\database\\index.js"));
var pageModel = require(__dirname.substr(0,(__dirname.lastIndexOf("\\"))) + ("\\database\\schemas\\pageSchema.js"));
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const passport = require("./")



/* GET api listing. */

router.get('/', (req, res) => {
  //get data for the index page and send data
  res.send('api works');
}).post('/', (req,res) =>{
});
router.get('/posts',(req,res,next) =>{
  axios.get(`${API}/posts`).then(posts =>{
    res.status(200).json(posts.data);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).send(error)
  }).next();
});

//route for navigation
router.get('/nav',(req,res) =>{
  res.send('placeholder for nav json')
});





//routes for connecting/disconnecting from facebook
router.get("/connect/facebook/auth",function(req,res,next){

});
router.get("/connect/facebook/callback",function(req,res,next){

});
router.get("/disconnect/facebook/",function(req,res,next){

});




router.get("/pages/:attribute/:value",function(req,res){
  var attribute = req.params.attribute
  var value = req.params.value;
  db.find(pageModel,{attribute:value},function(err,doc){
    if(err){
      console.log(err);
      res.status(501).send(err);
    }
    else{
      res.status(200).json(doc);
    }
 
  });


});

router.get("/projects",(req, res)=>{
  var projectName = req.query.name;
  var projectID = req.query.id;
  res.send("<!docytpe html><html><h1>projects data api get</h1><br /><h2>Project name: "+projectName + " project id:"+ projectID +" </h2></html>");
  //todo: add matching for the project

})
router.get("/projects/:projectDelim/",(req,res)=>{
  if(req.params["projectDelim"] === typeof("")){
    console.log(req.params["projectDelim"] + "parameter is a string");
  }
  else console.log(typeof(req.params["projectDelim"]) + req.params["projectDelim"]);
  res.header("application/json").send(req.params);
});


module.exports = router;