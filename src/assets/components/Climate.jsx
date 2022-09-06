import axios from "axios";
import React, { useEffect, useState } from "react";

const Climate = () => {

  const [weather, setWeather] = useState({})
  const [isKelvin, setIsKelvin] = useState(true)
  const [isDegreesCelsius, setIsDegreesCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=793911af1cc9cb4d38ead149dc4784bb`)
        .then(res => {
          setWeather(res.data)
        })
        .finally(() => setIsLoading(false))
    }
  }, []);

  const temp = () => {
    setIsKelvin(!isKelvin);
    setIsDegreesCelsius(!isDegreesCelsius);
  }

  console.log(weather)

  return (
    <div>
      {isLoading ? (
        <h2>Cargardo....</h2>
      ) : (
        <div className="App">
          <h1>Wheather Info</h1>

          <div><b>{weather.sys?.country}</b></div>
          <div><b>{weather.name}</b></div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt="" />
          <div><b>{isKelvin ? weather.main?.temp : weather.main.temp - 273.15} {isKelvin ? 'K' : '°C'}</b></div><br />
          <div><b>Speed wind: {weather.wind?.speed}</b></div>
          <div><b>Humidity: {weather.main?.pressure}</b></div>
          <div><b>Pressure: {weather.main?.humidity}</b></div>
          <button onClick={temp}>Temperature</button>
        </div>
      )}
    </div>
  );
};

export default Climate;