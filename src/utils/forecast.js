const request = require('request')

const forecast = (lat, long, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=4bdcad53da1e7b5005aede7f797cdb8e&query='+ lat + ',' + long +'&units=m'
    
    request({url, json:true} , (error,{body})=>{
        if(error){
            callback('Unable to connect',undefined);
        }
    
        else if(body.error){
            callback('Try another search',undefined);
        }
    
        else{
            callback(undefined,"It is currently " + body.current.temperature + " degrees out." + " But it feels like " + body.current.feelslike+ ".");
        }
    })
    
    
    
    }
    
    

    module.exports = forecast