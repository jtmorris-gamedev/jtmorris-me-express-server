const express = require('express');
const router = express.Router();
var db = require(__dirname.substr(0,(__dirname.lastIndexOf("\\"))) + ("\\database\\index"));

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';




/* GET api listing. */

router.get('/', (req, res) => {
  //get data for the index page and send data
  res.send('api works');
}).post('/', (req,res) =>{
});
router.get('/posts',(req,res) =>{
  axios.get(`${API}/posts`).then(posts =>{
    res.status(200).json(posts.data);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).send(error)
  });
});
router.get('/nav',(req,res) =>{
  res.send('placeholder for nav json')
});

router.get("/projects",(req, res)=>{
  var projectName = req.query.name;
  var projectID = req.query.id;
  res.send("<!docytpe html><html><h1>projects data api get</h1><br /><h2>Project name: "+projectName + " project id:"+ projectID +" </h2></html>");
  //todo: add matching for the project

})
router.get("/projects/:projectDelim/",(req,res)=>{
  pro
  if(req.params["projectDelim"] === typeof("")){
    console.log(req.params["projectDelim"] + "parameter is a string");
  }
  else console.log(typeof(req.params["projectDelim"]) + req.params["projectDelim"]);
  res.header("application/json").send(req.params);
});
router.ge
module.exports = router;