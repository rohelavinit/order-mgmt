var fs = require('fs')
var filePath = __dirname + '/data/managerData.json';

function formSubmitAction(reqBody, callBack){
    var formAction = reqBody.loginAction === 'Login' ? authenticateExistingUser : saveUserDetails  
    readOrModifyUserData(reqBody, formAction, callBack) 
}  

function readOrModifyUserData(reqBody, formAction, callBack){
  fs.readFile(filePath, 'utf8', (err, userData) => {
    if (err) {
      return console.log(err);
    }
    userData = userData ? userData : '[]'
    formAction(reqBody, JSON.parse(userData), callBack);
  });
} 

function authenticateExistingUser(reqBody, userData, callBack){
    var authStatus = false;
    var userDetails = reqBody
    for(var i = 0; i < userData.length; i++){
        if(userData[i].email === reqBody.email && userData[i].phone === reqBody.phone && userData[i].password === reqBody.password){
            authStatus = true;
            userDetails = userData[i]
            break;
        }
    }

    callBack({
        authStatus,
        authMsg: authStatus ? "Login succesfull" : "Login failed, Details not fonud!!",
        userDetails
    }) 
}

function saveUserDetails(reqBody, userData, callBack){
    var existingStatus = false
    for(var i; i < userData.length; i++){
        if(userData[i].email === reqBody.email && userData[i].phone === reqBody.phone){
            authStatus = true;
            break;
        }
    }

    if(existingStatus){
        callBack({
            authStatus: false,
            authMsg : "User already exists !!" 
        })
    }
    else{
        var userDetails = {    
                        userId: userData.length + 1,
                        username: reqBody.username , 
                        email: reqBody.email , 
                        password: reqBody.password, 
                        phone: reqBody.phone,
                   }

        userData.push(userDetails)
        fs.writeFile(filePath, JSON.stringify(userData, null, 3), 'utf8', ()=>{
            callBack({
                authStatus: true,
                authMsg : "User successfully added.", 
                userDetails
            })
        });
    }
}

module.exports = formSubmitAction
    
