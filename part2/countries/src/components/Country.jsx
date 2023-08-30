import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const Country = ({ country }) => {

    const [countryToShow, setCountryToShow] = useState('')

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country[0]}`)
            .then(response => {
                console.log(response.data)
                setCountryToShow(response.data)
            })
    }, [])

    return (
        <div>
            <h1>{countryToShow?.name?.common}</h1>
            <h2>({countryToShow?.name?.official})</h2>
            <p>Population: {countryToShow.population}</p>
            <p>Area: {countryToShow.area}</p>
            <p>Languages:</p>
            <ul>
                {Object.values(countryToShow?.languages || {}).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={`${countryToShow?.flags?.png}`} alt={`Flag of ${countryToShow?.name?.common}`} className="flag-container"/>
        </div>
    )
}
export default Country