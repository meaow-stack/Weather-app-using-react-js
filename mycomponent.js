import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=934392d6158ac1fdb9e0ca337d0eb1ab&units=metric`);
            setWeather(response.data);
            setError(null);
        } catch (err) {
            setError('City not found. Please try again with a valid city.');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            getData();
        } else {
            setError('Please enter a  correct city name.');
        }
    };

    const handleChange = (e) => {
        setCity(e.target.value);
        setError(null);
    };

    const handleClose = () => {
        setWeather(null);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card text-bg-info mb-3">
                    <h1 className="text-center">Get Your Weather </h1>
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="form-group">
                            <label htmlFor="city"><b>City</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Enter A City"
                                value={city}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Get your Weather</button>
                    </form>
                    {loading && <div className="text-center">Loading...</div>}
                    {error && <div className="alert alert-dark" role="alert">{error}</div>}
                    {weather && (
                        <div className="card">
                            <div className="card-body">
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                                <h5 className="card-title">{weather.name}</h5>
                                <p className='card'>
                                <img src='sun.png' className='img-thumbnail' alt='sun'></img>
                                </p>
                                <p className="card-text">Temperature: {weather.main.temp}°C</p>
                                <p className="card-text">Weather: {weather.weather[0].description}</p>
                                <p className="card-text">Humidity: {weather.main.humidity}%</p>
                                <p className="card-text">Wind Speed: {weather.wind.speed} m/s</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
