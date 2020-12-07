import React, { useState } from 'react'
import './App.scss';

const api = {
  key: "f0810b20bd971aae3179f4264eb0cba7"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const buildDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Monday', 'Tuesday', 'Webnesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']

    let day = days[date.getDay()]
    let dateNum = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return `${day} ${dateNum} ${month} ${year}`
  }

  const search = (e) => {
    if(e.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data)
        setQuery('')
        console.log(data)
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className={
      (typeof weather.main !== 'undefined') 
      ? (`app ${weather.weather[0].main.toLowerCase()}`)
      : 'app'
    }>
      <div className='weather'>
        <input
        type='text'
        placeholder='Search Country...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
        />
        {(typeof weather.main !== 'undefined') ? (
          <div className='info'>
            <p className='country'>{weather.name}, {weather.sys.country}</p>
            <p className='date'>{buildDate(new Date())}</p>
            <p className='temp'>{Math.round(weather.main.temp) - 273}ºc</p>
            <p className='status'>{weather.weather[0].main}</p>
          </div>
        ) 
        : ('')}
      </div>
    </div>
  )
}

export default App;
