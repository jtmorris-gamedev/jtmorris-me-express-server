"use strict";
//setup the mongoose object
var mongoose = require('mongoose');


//Set up default mongoose connection with updated function and useMongoClient:true
//create a base database object to assist with creating connections
module.exports= class Database{
        constructor(/*string*/ userName, password, dbName, modelName, dbSchema, authSource, hostAddress){
            //import mongoose context for local use
            const mongoose = require('mongoose');
            if(typeof(userName) === "string"){
                this.userName = userName;
            }
            else{
                throw new TypeError("error on creation of Database object: userName Argument is " + typeof(userName) + ". expected a String" )
            }
            if(typeof(password) === "string"){
                this.password = password;
            }
            else{
                throw new TypeError("error on creation of Database object: password Argument is " + typeof(password) + ". expected a String" );
            }
            if(typeof(dbName) === "string"){
                this.dbName = dbName;
            }
            else{
                throw new TypeError("error on creation of Database object: dbName Argument is " + typeof(dbName) + ". expected a String" );
            }
            if(typeof(dbSchema) === "object"){
                this.schema = dbSchema;
                if(typeof(dbName) ==="string"){
                    this.modelName = modelName;
                    this.model = mongoose.model(this.modelName, this.schema);
                }
                else{
                    throw new TypeError("error on creation of Database object: dbModelName Argument is " + typeof(dbModelName) + ". expected an Object" );
                }
            }

            else{
                throw new TypeError("error on creation of Database object: dbSchema Argument is " + typeof(dbSchema) + ". expected an object" )
            }
            
            //for the handler functions, the variables for accesssing user and database name are this.user (user) and this.name (database name) when called in the context of mongoose.model(...).on("event",handlerFunction()).
            this.onConnecting = this.onConnecting || function onConnecting(msg){

                console.log(`making connection to database ${this.name} using model ${this.model.name} as user ${this.user}\nMongo message:${msg}`);
            }
            this.onConncected = this.onConncected || function onConnected(msg){
                console.log(`connection made to database ${this.name} using model: ${modelName} as user:${this.user}\nMongo message:${msg}`)
            }
            
            this.onOpen = this.onOpen || function onOpen(msg){
                var outputMsg = `opened connection to ${this.name} using model ${modelName} `
                if(this.user){
                    outputMsg+= `as ${this.user}`
                }
                if(msg){
                    outputMsg+=`\nMongo message ${msg}`
                }


                console.log(outputMsg);
            }
            this.onDisconnecting = this.onDisconnecting || function onDisconnecting(msg){
                console.log(`closing connection to database: ${this.name}\nMongo message:${msg}`);
            }
            this.onDisconnected = this.onDisconnected || function onDisconnected(msg){
                console.log(`connection to database ${this.name} has been disconnected or lost.\nMongo message:${msg}`);
            }
            this.onReconnected = this.onReconnected ||function onReconnected(msg){
                console.log(`sucessfully reconnected to database ${this.name}\nMongo message:${msg}`);

            }  
            this.onClose = this.onClose || function onClose(msg, _this=this){
                console.log(`closed and disconnected from database ${this.name}.\nMongo message:${msg}`);
            }
            this.onError = this.onError || function onError(errMsg){
                console.log(`An error occured with the connection to database ${this.name} \nMongo error message:${errMsg}`);
            }
            this.authSource = authSource || "admin";
            this.hostAddress = hostAddress || "127.0.0.1"
            this.connectionUriWithAuth = `mongodb://${this.userName}:${this.password}@${this.hostAddress}/${this.dbName}?authSource=${this.authSource}`;
            this.connectionUriNoAuth = `mongodb://${this.hostAddress}/${this.dbName}?authSource=${this.authSource}`
            this.connection = this.connect(this.connectionUriNoAuth);
            this.connection.model(this.modelName);
        }

        connect(connectionUri){
            var connection = mongoose.createConnection(connectionUri)
            .on('connecting',this.onConnecting)
            .on('connected', this.onConncected)
            .on('open',this.onOpen)
            .on('disconnecting',this.onDisconnecting)
            .on('disconnected',this.onDisconnected)
            .on('close',this.onClose)
            .on('error',this.onError)
            .on("reconnected",this.onReconnected)
            return connection;
        }

    }
