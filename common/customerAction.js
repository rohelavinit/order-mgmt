var fs = require('fs')
var filePath = __dirname + '/data/customerData.json';

function saveCustomer(reqBody, callBack){
    readOrModifyCustomerData(reqBody, saveData, callBack) 
} 

function readOrModifyCustomerData(reqBody, customerAction, callBack){
  fs.readFile(filePath, 'utf8', (err, customerData) => {
    if (err) {
      return console.log(err);
    }
    customerData = customerData ? customerData : '[]'
    customerAction(reqBody, JSON.parse(customerData), callBack);
  });
} 

function saveData(reqBody, customerData, callBack){
    var len = 0;
    for(var i=0; i < customerData.length; i++, len = i){
        if(customerData[i].customerName === reqBody.customerName){
            break;
        }
    }
    
    if(len === customerData.length){
        customerData.push({
            customerName: reqBody.customerName,
            details: []
        })
    }

    customerData[len].details.push({
        item: reqBody.item,
        itemQnt: reqBody.itemQnt, 
        itemPrc: reqBody.itemPrc
    })

    fs.writeFile(filePath, JSON.stringify(customerData, null, 3), 'utf8', ()=>{
        callBack()
    });
}

function searchCustomer(reqBody, callBack){
    readOrModifyCustomerData(reqBody, searchByName, callBack)
}

function searchByName(reqBody, customerData, callBack){
    for(var i=0; i < customerData.length; i++){
        if(customerData[i].customerName === reqBody.customerName){
            break;
        }
    }
    callBack(customerData[i])
}

module.exports = {
    saveCustomer,
    searchCustomer
}
    
