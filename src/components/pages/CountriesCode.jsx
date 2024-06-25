// import React from 'react'

import { useState } from "react"

function CountriesCode({ countries }) {
    const [selectedCountryCode, setSelectedCountryCode] = useState("")
    console.log(selectedCountryCode)

    return (
        <div>
            <select
                className=""
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
                <option value="">Select a country</option>
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.code}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CountriesCode