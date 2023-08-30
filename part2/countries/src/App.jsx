import { useEffect, useState } from "react";
import axios from 'axios';
import Country from "./components/Country";

function App() {

  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
  }, [query])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const countriesToShow = query.length > 0 ? countries.filter(country => country.toLowerCase().includes(query.toLowerCase())) : "";

  return (
    <>
      <div className="search-container">
        <p>Find countries:</p>
        <input
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <div>
        {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
        {countriesToShow.length <= 10 && countriesToShow.length > 1 ? countriesToShow.map(country => <p key={country}>{country}</p>) : ''}
        {countriesToShow.length === 1 && <Country country={countriesToShow} />}
      </div>
    </>
  )
}

export default App
