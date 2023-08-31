const port = 5000

const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
app.use(cors())

app.listen(5000, () => console.log(`Server is running on ${port}`))

app.get('/:query', (req, res) => {
    const { query } = req.params
    const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.VITE_WEATHER_API_KEY}`,
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})