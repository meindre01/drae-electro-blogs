const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'MEINDRE-Blog'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'MEINDRE-Blog'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            message : 'You must to provde the address !'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location = {}})=>{
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(longitude,latitude,(error,dataForecast)=>{
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                address : req.query.address,
                forecast : dataForecast,
                location : location
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name : 'MEINDRE-Blog'
    })
})

app.get('/article',(req,res)=>{
    res.render('article',{
        title : 'Artikel',
        article : 'Instrument',
        name : 'Meindre-Blog'
    })
})

app.get('/thermocouple',(req,res)=>{
    res.render('thermocouple',{
        title : 'Artikel',
        article : 'Thermocouple',
        name : 'Meindre-Blog'
        
    })
})

app.get('/rtd',(req,res)=>{
    res.render('rtd',{
        title : 'Artikel',
        article : 'RTD Sensor',
        name : 'Meindre-Blog'
    })
})

app.get('/loadcell',(req,res)=>{
    res.render('loadcell',{
        title : 'Artikel',
        article : 'LoadCell',
        name : 'Meindre-Blog'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        message : 'page not found',
        name : 'Meindre-Blog'
    })
})

app.listen(port,()=>{
    console.log('Server is serv on ' + port)
})