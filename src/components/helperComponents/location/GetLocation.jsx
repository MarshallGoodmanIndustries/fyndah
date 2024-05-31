import { useState } from "react";
const GetLocation = () => {
    const [coord, setCoord] = useState({
        lat: "",
        lng: ""
    });
    const [userCountry, setUserCountry] = useState();

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoord(coord, {lat: position.coords.latitude, lng: position.coords.longitude});
            },
            (error) => {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }else {
        console.log("ERROR");
    }
    
    async function getCityStateCountry(lat, long) {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          setUserCountry(data.countryName);
          console.log(data, data.countryName); // Logs the city, state, and country
        } catch (error) {
          console.error("Failed to retrieve location data:", error);
        }
      }

      getCityStateCountry(coord.lat, coord.long) 
   
   
  return userCountry;
}

export default GetLocation;