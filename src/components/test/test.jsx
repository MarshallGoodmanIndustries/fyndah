import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryStateCitySelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        axios.get('http://localhost/test/get_country.php')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the countries!", error);
            });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            axios.get(`http://localhost/test/get_states.php?country_id=${selectedCountry}`)
                .then(response => {
                    setStates(response.data);
                    setCities([]); // Reset cities when country changes
                })
                .catch(error => {
                    console.error("There was an error fetching the states!", error);
                });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            axios.get(`http://localhost/test/get_cities.php?state_id=${selectedState}`)
                .then(response => {
                    setCities(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the cities!", error);
                });
        }
    }, [selectedState]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState(''); // Reset state when country changes
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    return (
        <div>
            <div>
                <label>Country:</label>
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select a country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>
                            {country.country_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>State:</label>
                <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select a state</option>
                    {states.map(state => (
                        <option key={state.id} value={state.id}>
                            {state.state_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>City:</label>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                    <option value="">Select a city</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.city_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CountryStateCitySelector;
