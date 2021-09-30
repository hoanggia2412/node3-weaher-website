const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const port = 3000
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const publicDirectory = path.join(__dirname,'../public')
const viewDirection = path.join(__dirname,'../src/templates/views')
const partialsDirection = path.join(__dirname,'./templates/partials')

app.set('view engine','hbs')
//cấu hình thư mục public
app.use(express.static(publicDirectory))

//cấu hình thư mục views
app.set('views',viewDirection)
hbs.registerPartials(partialsDirection)

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({error: 'You must provide an address'})
    const {query} = req
    const {address} = query
    geocode(address,(error, {lat,lon,location}={})=>{
        if(error)
        return res.send({error})    
        forecast(lat,lon,(error,forecastData)=>{
            if(error)
            return res.send({error})
            res.send({forecastData,location})
        })
    })
    })


app.get('/product',(req,res) => {
    if(!req.query.search)
    return res.send({
        error: 'You must provide a search term'
    })
    res.send({

    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Gia'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Gia',
    })
})
app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Gia'
    })
})
app.get('/*',(req,res)=>{
    res.render('error',{
        errorMessage: 'Not Found Page. Try another!',
        title: 'Error',
        name: 'Gia',
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })