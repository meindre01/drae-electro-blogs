const request = require('request')
const forecast = (latitude,longitude,callback)=>{
  
    const url = 'http://api.weatherstack.com/current?access_key=5267ebebba415f9180cefd1013031090&query=' + latitude + ',' + longitude 

    request({url : url,json : true},(error, {body})=>{
       if(error){
           callback('Cannot connect to service server !', undefined)
       }else if(body.error){
           callback('Cannot find your location. Try another search !', undefined)
       }else{
           callback(undefined,body.location.name + ' ' + body.current.weather_descriptions + ' The temperature is ' + body.current.temperature + '.But feels like ' + body.current.feelslike)
       } 
    })
}

module.exports = forecast
