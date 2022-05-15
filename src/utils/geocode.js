const request = require('request')

const geocode = (address,callback)=>{
    const curl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVpbmRyZSIsImEiOiJjazRvMDc0eW4yY3BzM2tsYjIwYzc0Ymt0In0.-bLyeMeBvnxnCuJ-WwufJA'
request({url : curl, json : true},(error,{body} )=>{
    if(error){
        callback('Cannot connect to web service !',undefined)
    }else if(body.features.length === 0){
        callback('Cannot find your location. Try another search !',undefined)
    }else{
        callback(undefined,
        {
        longitude : body.features[0].center[1],
        latitude : body.features[0].center[0],
        location : body.features[0].place_name
    })

    }
})

}

module.exports = geocode
