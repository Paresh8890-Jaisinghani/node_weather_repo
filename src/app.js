    const path = require('path')
    const express = require('express')
    const hbs = require('hbs')
    const geocode = require('./utils/geocode')
    const forecast = require('./utils/forecast')
    const cors = require('cors');
    const app = express()
    

    app.use(cors());
  

    //define path for Express config
    const publicpathdirectory = path.join(__dirname,'../public')
    const viewpath = path.join(__dirname,'../template/views')
    const partialpath = path.join(__dirname,'../template/partials')
    console.log(partialpath)

    //setup Handelbars engine and views location
    app.set('view engine','hbs')
    app.set('views',viewpath)
    hbs.registerPartials(partialpath)
    


    //setup static directory to serve
    app.use(express.static(publicpathdirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name : 'Paresh'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Paresh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Paresh',
        helptext : 'Text for help Page'
    })
})





app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must Provide a search term"
        })
    }
  
    geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })


    })  
     
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404 Page',
    text :'Help article not found',
    name:'Paresh'
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        text :'Page Not found',
        name:'Paresh'
    })
})


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})