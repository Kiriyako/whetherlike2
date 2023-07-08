"use client"
import { useState, useEffect } from "react"
export default function Main(){

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
    return (<div id = "cnf"> City Not Found </div>)
   }
  const temp = Math.round(weatherData && weatherData.main.temp)
  const feelstemp = Math.round(weatherData && weatherData.main.feels_like)
  const epochTime = (weatherData && weatherData.dt)
  const normalDate = new Date(epochTime * 1000);
  const icon = (weatherData && weatherData.weather[0].icon)
  const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
  const countryId = weatherData?.sys?.country;
  const country = countryId ? regionNames.of(countryId) : '';
  const link = `https://openweathermap.org/img/wn/${icon}.png`

  return(
    <div className="bg-black/80 p-5 rounded-3xl text-white" id="main">
    <div id ="navbar">

    <form onSubmit={finalCity}>  
      <div className="justify-center" id ="input">

      <input className=" w-80 rounded-2xl border-2 p-2 text-xl bg-black/60" onChange={sinCity} value={city} placeholder="What's the weather like in..?" /> <button className="align-middle border-2 rounded-3xl text-xl h-10 w-10 p-2 bg-black/60 hover:bg-black/20" onClick={finalCity}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"></path></svg></button></div>
    </form><br /> </div>
    <div>

    <div key={weatherData.name} id ="tempDisplay">
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
