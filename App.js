import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import MyComponent from './mycomponent';
import Sun from './sun.png';
import { FaBeer } from 'react-icons/fa';
import { MdAlarm } from 'react-icons/md';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInputGroup,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

const handleClick = async (e, city, setWeather, setError) => {
    e.preventDefault();
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
        setWeather(response.data);
        setError(null);
    } catch (error) {
        console.log(error);
        setError('City not found or API error. Please try again and enter the city to start');
        setWeather(null);
    }
};

export default function App() {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="body">
            <>
                <header>
                    <div className='App-header'>
                    </div>
                    <h1>The Weather App</h1>
                </header>
                <div className='container-fluid'>
                    <div className='card text-bg-info mb-3'>
                        <MyComponent />
                        <FaBeer />
                    </div>

                </div>

                {error && (
                    <div className="alert alert-danger mt-4" role="alert">
                        {error}
                    </div>
                )}

                <MDBFooter bgColor="light" className="text-center text-lg-left mt-5">
                    <MDBContainer className="p-4">
                        <MDBRow>
                            <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
                                <h5 className="text-uppercase">The Weather App</h5>
                                <p>
                                    Sayantan Mukherjee@Copyright
                                </p>
                            </MDBCol>
                            <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
                                <h5 className="text-uppercase">For Errors email at
                                    <a href="mailto:sayantanmukherjee@gmail.com"> Email</a>
                                </h5>
                                <p>
                                    For Any query
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                        &copy; {new Date().getFullYear()} Copyright:{'Sayantan'}
                        <a className="text-dark" href="https://mdbootstrap.com/">
                            MDBootstrap.com
                        </a>
                    </div>
                </MDBFooter>
            </>
        </div>
    );
}
