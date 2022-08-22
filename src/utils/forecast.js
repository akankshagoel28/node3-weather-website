const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f5f0d3dc633d6315de4923f2bcf8f1b&query=' + latitude + ',' + longitude+'&units=f'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location. Check coordinates', undefined)
        }
        else {
            callback(undefined, 
                body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. But it feels like '+body.current.feelslike+' degrees out.'
            )

        }
    })
}
module.exports = forecast