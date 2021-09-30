const request = require('request')

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaG9hbmdnaWEyNDEyIiwiYSI6ImNrdTQwbnc4djFncmwyb3FyZzR4MTAxbTMifQ.0QZQvVg0wx1QnBC8oF4DPw`
    request({url,json:true},(error,response,body)=>{
        if(error){
            callback('Unable to connect loaction services!',undefined)
        } else if (body.features.length === 0 ){
            callback('Unable to find location. Try another!',undefined)
        } else {
            callback(undefined,{
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}
module.exports = geocode