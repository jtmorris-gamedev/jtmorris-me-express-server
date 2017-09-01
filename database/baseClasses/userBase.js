//properties: set internal properties as _property to avoid collision

module.exports = class User{
    constructor(
        username, //required
        password, //required
        firstName, //name fields are required
        middleName, 
        lastName,
        phones, //phone number is not required
        address //address is not required
    ){
        this._username = username
        this._name = {
            first:firstName,
            middle:middleName,
            last:lastName
        }
        
    }
    set username(newUsername){
        //this.username = username
        this._username = newUsername;
        
    }
    get username(){
        return this._username;
    }
    username(newUsername){
        this.username = newUsername
        return this;
    }

        
    /*get username(){
        return this.username
    }*/
    firstName(newFirstName){
        if(newFirstName){
            this._name.first= newFirstName
        }
        else if(typeof(newFirstName)==="object"){
            //handle if its of type object
        }
        else{

        }
        return this
    }
    middleName(newMiddleName){
        if(newMiddleName){
            this._name.middle = newMiddleName;
        }
        return this;
    }
    
    set name(nameObj){

        if(typeof(nameObj)==="object"){
            //setup this.name
            //check for first name

            if(nameObj.first){
                this._name.first=nameObj.first;
            }

            else if(nameObj.middle){
                this._name.middle=nameObj.middle;
            }
            else if(nameObj.last){
                this._name.last = nameObj.last
            }
        }
        else{
            throw new TypeError("error on call to User(..).name(obj): the name object is of type  "+ typeof(nameObj)+".");
        }

    }
    get name(){
        return this._name;
    }
    //can i chain method calls and then return a result variable?
    
    
}
