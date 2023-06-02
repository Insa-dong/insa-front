import React, { useState, useEffect } from 'react';
import styles from './Weather.module.css';

function Weather() {
    const API_KEY = '482b48e5430ca79e7d7468ffff7925ed';
    const [main, setMain] = useState();
    const [cityname, setCityname] = useState('');
    const [weather, setWeather] = useState({});
    const [wind, setWind] = useState({});
    const [icon, setIcon] = useState('');

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                currentPosition => {
                    resolve(currentPosition.coords);
                },
                error => {
                    reject(error);
                }
            );
        });
    };

    const getWeather = (coords) => {
        const { latitude, longitude } = coords;
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json());
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const coords = await getPosition();
                const weatherData = await getWeather(coords);
                setCityname(weatherData.name);
                setWeather(weatherData.weather[0]);
                setWind(weatherData.wind);
                setMain(weatherData.main.temp);
                setIcon(weatherData.weather[0].icon);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadData();
    }, []);

    let imgSrc;
    const weatherCode = icon.slice(0, 2);
    switch (weatherCode) {
        case '01':
            imgSrc = '/images/sunny_weather_icon_131721.png';
            break;
        case '02':
            imgSrc = '/images/흐림.png';
            break;
        case '03':
            imgSrc = '/images/구름낀.png';
            break;
        case '04':
            imgSrc = '/images/구름낀.png';
            break;
        case '09':
            imgSrc = '/images/소나기.png';
            break;
        case '10':
            imgSrc = '/images/비.png';
            break;
        case '11':
            imgSrc = '/images/천둥.png';
            break;
        case '13':
            imgSrc = '/images/눈.png';
            break;
        case '50':
            imgSrc = '/images/안개.png';
            break;
        default:
            imgSrc = 'default.png';
            break;
    }

    return (
        <div className={styles['weather-container']}>
            <h1 className={styles['weather-heading']}>Today's Weather</h1>
            <div className={styles['wearherWrap']}>
                <div>
                    <img src={imgSrc} alt="Weather Icon" className={styles['weather-icon']} />
                </div>
                <div>
                    <h4 className={styles['weather-info']}>{`${cityname}`}</h4>
                    <h4 className={styles['weather-info']}>{`${Math.round(main)}°C`}</h4>
                    <h4 className={styles['weather-info']}>{`${weather.main}`}</h4>
                    {/* <h4 className={styles['weather-info']}>{`Wind: ${wind.deg}`}</h4>
                    <h4 className={styles['weather-info']}>{`Wind Speed: ${wind.speed}m/s`}</h4> */}
                </div>
            </div>
        </div>
    );
}

export default Weather;
