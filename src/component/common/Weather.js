import React, { useState, useEffect } from 'react';

function Weather() {

    const API_KEY = '482b48e5430ca79e7d7468ffff7925ed';
    const [position, setPosition] = useState({});
    const [cityname, setCityname] = useState('');
    const [weather, setWeather] = useState({});
    const [wind, setWind] = useState({});

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
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            .then(response => response.json());
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const coords = await getPosition();
                const weatherData = await getWeather(coords);
                setPosition(coords);
                setCityname(weatherData.name);
                setWeather(weatherData.weather[0]);
                setWind(weatherData.wind);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <h1>Today's Weather</h1>
            <h3>현재 위치</h3>
            <h4>{`위도: ${position.latitude} | 경도: ${position.longitude}`}</h4>
            <h4>{`조회 도시: ${cityname}`}</h4>
            <h4>{`날씨: ${weather.main} | 날씨 설명: ${weather.description}`}</h4>
            <h4>{`풍향: ${wind.deg} | 풍속: ${wind.speed}m/s`}</h4>
        </>
    );
};


export default Weather;
