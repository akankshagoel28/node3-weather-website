const path = require("path");
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

const port = process.env.PORT || 3000

//Define paths for Express aconfig
const publicDirectoryPath = path.join(__dirname, './public')

//Setup handlebars and views location
var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partials"),
    defaultLayout: false,
    extname: 'hbs'
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../views/layouts"))


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akanksha Goel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akanksha Goel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text",
        title: 'Help',
        name: 'Akanksha Goel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {

    }) => {
        if (error)
            return res.send({ error })
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error)
                return res.send({ error })
            res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Akanksha Goel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Akanksha Goel'
    })
})

//app.com  
//app.com/help
//app.com/about
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})