import React, { useState, useEffect } from 'react'
import './weather.css'
import axios from 'axios'
import { GiSettingsKnobs } from 'react-icons/gi'


const Weather = () => {
    const [city, setCity] = useState('تهران')
    const [weather, setWeather] = useState([])
    const [changeClass, setChangeClass] = useState(false)
    
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fa&units=metric&appid=5d7ddda27b9fb9d415119b8bd66dc33a`
        axios.get(url)
        .then(data => setWeather([data.data]))
       
    }, [city])

    const icon = weather.map(item => {
        switch (item.weather[0].icon) {
            case '01d':
                return 'http://openweathermap.org/img/wn/01d@2x.png'
                break;
            case '01n':
                return 'http://openweathermap.org/img/wn/01d@2x.png'
                break;
            case '02d':
                return 'http://openweathermap.org/img/wn/02d@2x.png'
                break;
            case '02n':
                return 'http://openweathermap.org/img/wn/02d@2x.png'
                break;
            case '03d':
                return 'http://openweathermap.org/img/wn/03d@2x.png'
                break;
            case '03n':
                return 'http://openweathermap.org/img/wn/03d@2x.png'
                break;
            case '04d':
                return 'http://openweathermap.org/img/wn/04d@2x.png'
                break;
            case '04n':
                return 'http://openweathermap.org/img/wn/04d@2x.png'
                break;
            case '09d':
                return 'http://openweathermap.org/img/wn/09d@2x.png'
                break;
            case '09n':
                return 'http://openweathermap.org/img/wn/0nd@2x.png'
                break;
            case '10d':
                return 'http://openweathermap.org/img/wn/10d@2x.png'
                break;
            case '10n':
                return 'http://openweathermap.org/img/wn/10n@2x.png'
                break;
            case '11d':
                return 'http://openweathermap.org/img/wn/11d@2x.png'
                break;
            case '11n':
                return 'http://openweathermap.org/img/wn/11n@2x.png'
                break;
            case '13d':
                return 'http://openweathermap.org/img/wn/13d@2x.png'
                break;
            case '13n':
                return 'http://openweathermap.org/img/wn/13n@2x.png'
                break;
            case '50d':
                return 'http://openweathermap.org/img/wn/50d@2x.png'
                break;
            case '50n':
                return 'http://openweathermap.org/img/wn/50n@2x.png'
                break;

            default:
                return ''
                break;
        }
    })

    const handleSetting = () => {
        setChangeClass(!changeClass)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        city !== '' ? setCity(city) : setCity('تهران')
        setChangeClass(!changeClass)
    }

    return (
        <div className='weather'>
            <div style={{ display: 'flex',width: '100%',justifyContent: 'center' }}>
                <GiSettingsKnobs className='settingIcon' onClick={handleSetting} />
                <h6 className='city'>{city}</h6>
            </div>
            <div className={changeClass ? 'inputNone' : 'input'}>
                <input type="text" className='inputCity' value={city} onChange={(e) => setCity(e.target.value)} />
                <button className='btnCity' onClick={handleSubmit}>ثبت</button>
            </div>

            {
                weather.length !== 0 ? weather.map(item => (
                    <div key={item.id} className={!changeClass ? "weatherItem" : ''}>
                        <img alt={item.weather[0].description} src={icon} />
                        <div className='imgTemp'>
                            <h5>{Math.ceil(item.main.temp)}°C</h5>
                            <h5 className='desc'>{item.weather[0].description}</h5>
                        </div>
                    </div>
                ))
                    : ''
            }
        </div>
    )
}

export default Weather