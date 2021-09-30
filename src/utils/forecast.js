const request = require('request')


const forecast = (lat,lon,callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=6489643725d5a4011a02b8f5dc9a96bb`
    request({url,json: true},(error,response,body) =>{
        if(error)
        callback('Unable to load forecast server!',undefined)
        else if(body.cod === '400')
        callback(body.message, undefined)
        else
        callback(undefined,{
            main : body.weather[0].main,
            description: body.weather[0].description,
            temp: body.main.temp - 273.15
        })
    })
}
module.exports = forecast