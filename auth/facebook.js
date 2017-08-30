var passportFacebook= require('pasport'), FacebookStrategy = require("passport-faceook").Strategy;
passportFacebook.use(new FacebookStrategy(
        {
            clientID: 449844408748203,
            clientSecret: "a25c5d36b98a5c5feb028fdc8d16b576",
            callbackUrl:"http://dev.jtmorris.me/api/connect/facebook/callback"
        }
))



//faceboook app id: 449844408748203 jtmorris-me-test1
//faceboook account kit jtmorris-me test1
/*
app secret:a25c5d36b98a5c5feb028fdc8d16b576
api version: 1.0
client token:e93b6713971933e042f74d07b2187b8a

*/

module.exports = passportFacebook;