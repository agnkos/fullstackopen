import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const api_key = import.meta.env.VITE_WEATHER_API_KEY

// loading weather
// 1. nested axios get (still get icon not found at first - as city is undefined)
// 2. problems with loading weather icon: weatherToShow?.weather?.[0]?.icon - images load first?
// 3. move axios get country data to App (button onclick) and pass it as a prop here? - slower
// 4. add loading state to render after data is ready - final solution - however it tooks a while to load

const Country = ({ country }) => {

    const [countryToShow, setCountryToShow] = useState([]);
    const [weatherToShow, setWeatherToShow] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country[0]}`)
            .then(response => {
                setCountryToShow(response.data)

                axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
                    .then(response => {
                        setWeatherToShow(response.data)
                        setLoading(false)
                    })
            })
    }, [])

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) :
                (<>
                    <h1>{countryToShow?.name?.common}</h1>
                    <h2>({countryToShow?.name?.official})</h2>
                    <p>Capital: {countryToShow?.capital}</p>
                    <p>Population: {countryToShow?.population}</p>
                    <p>Area: {countryToShow?.area}</p>
                    <p>Languages:</p>
                    <ul>
                        {Object.values(countryToShow?.languages || {}).map(language => <li key={language}>{language}</li>)}
                    </ul>
                    <img src={`${countryToShow?.flags?.png}`} alt={`Flag of ${countryToShow?.name?.common}`} className="flag-container" />
                    <h2>Weather in {countryToShow?.capital}</h2>
                    <p>Temperature: {weatherToShow?.main?.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherToShow?.weather?.[0]?.icon}@2x.png`} className="weather-icon" />
                    <p>Wind: {weatherToShow?.wind?.speed} m/s</p>
                </>)
            }
        </>
    )
}
export default Country