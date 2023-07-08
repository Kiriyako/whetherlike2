"use client"
import { useState, useEffect } from "react"

export default function Main(){
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const [city, setCity] = useState('')
  const [submitCity, setSubmitCity] = useState('Kyoto')
  const [weatherData, setWeatherData] = useState(null)
  
  function finalCity(e){
    e.preventDefault();
   setSubmitCity(city)
  }
  function sinCity(e){
    setCity(e.target.value)
  }

  async function getWeatherData(){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${submitCity}&units=metric&appid=62c1f688c3f4ca239cd36cef9446f2f7`, { cache: 'no-store' })
    const data = await res.json()
    setWeatherData(data)
   }
   
   useEffect(() => {
    if(submitCity) {
      getWeatherData()
    }
   }, [submitCity])
   if(weatherData && weatherData?.message == "city not found"){
    return (<div className="text-4xl text-white bg-pink-400 rounded-2xl w-100% h-20 p-5" id = "cnf"> City Not Found </div>)
   }
   const { main, weather, sys } = weatherData || {};
   const temp = Math.round(main?.temp);
   const feelstemp = Math.round(main?.feels_like);
   const epochTime = weatherData?.dt;
   const icon = weather?.[0]?.icon;
  const normalDate = new Date(epochTime * 1000);
  const countryId = sys?.country;
  const country = countryId ? regionNames.of(countryId) : '';
  const link = `https://openweathermap.org/img/wn/${icon}.png`

  return(
    <div className="bg-black/80 p-5 rounded-3xl text-white" id="main">
    <div id ="navbar">

    <form onSubmit={finalCity}>  
      <div className="justify-center" id ="input">
      <input className=" w-80 rounded-2xl border-2 p-2 text-xl bg-black/60" onChange={sinCity} value={city} placeholder="What's the weather like in..?" /> <button className="align-middle border-2 rounded-3xl text-xl h-10 w-10 p-2 bg-black/60 hover:bg-black/20" onClick={finalCity}>
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path>
    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path>
  </svg>
</button>
</div>
    </form><br /> </div>
    <div>

    <div key={weatherData && weatherData.name} id ="tempDisplay">
    <div id ="resultsfor">
     Results for {weatherData && weatherData.name}, {country} </div><br></br>
    <div className="text-4xl justify-center" id="temppp"> <img src={link}></img> {temp}°C <br></br></div>
    <div className="text-xl" id="rest">
     {normalDate.toDateString()}
<br></br>
   <b> Feels like {feelstemp}°C, {weatherData && weatherData.weather[0].main}</b>  <br></br>
   Wind: {weatherData && weatherData.wind.speed} m/s <br></br>
    Humidity: {weatherData && weatherData.main.humidity}%, Pressure: {weatherData && weatherData.main.pressure}hPa <br></br>
     </div>
    </div>
    </div>
    </div>
  )
}
