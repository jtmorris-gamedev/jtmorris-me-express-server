"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const GithubStategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const bcrypt = require("bcrypt")

app.paths.passport = __dirname;
//local authentication
passport.use(new LocalStrategy(

));


//facebook authenticatoin
pasport.use(new FacebookStrategy(

));

//google authentication
pasport.use(new GoogleStrategy(
    
    ));

 pasport.use(new FacebookStrategy(
 ));
 passport.use(new GithubStategy(
//client ID: 9c0961341fa9a956cd03
//Client Secret: 72bcb033f91b04d789719c3343750c8e580af569
 ));
 passport.use(new TwitterStrategy(

 ));     
//github authentication
//linkedin authentication
module.exports = passport;