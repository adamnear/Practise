import React, { useState, useEffect } from 'react';
import axios from 'axios';
import rain from './Audio/rain.wav';
import AudioPlayer from './AudioPlayer';
//Pass down the local time to weather.js from app.js


export default function Weather({ localHour }) {
    const [rainData, setRainData] = useState(null);
    const [currentRain, setCurrentRain] = useState('');
    const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || ''); //Using the localStorage.getItem function here instead of at the later useEffect function
    const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || ''); //The initial values for latitude and longitude are set directly using localStorage.getItem('latitude') and localStorage.getItem('longitude')
                                                                                        //The "||" operator will be used as a fallback if the values for latitude or longitude are empty 

    const getWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain`
            );
            const rainData = response.data.hourly.rain; //Fetching rain data within the array, like a folder (data>hourly>rain)
            setRainData(rainData);
            
            console.log(rainData);
        } catch (error) {
            console.log(error);
        }
    };

    //useEffect can be for re-checking the weather everytime the localHour changes
    useEffect(() => {
        setCurrentRain(localHour);
    }, [localHour]);

    const handleLatitudeChange = (event) => {
        const newLatitude = event.target.value;
        setLatitude(newLatitude);
        localStorage.setItem("latitude", newLatitude); //Using the users input for latitude to set the value to the item "latitude"
    };

    const handleLongitudeChange = (event) => {
        const newLongitude = event.target.value;
        setLongitude(newLongitude);
        localStorage.setItem("longitude", newLongitude); //Using the users input for longitude to set the value to the item "longitude"
    };

    return (
        <div className='Weather'>
            <main>
                <form onSubmit={getWeather}>
                    <label id="Lat">Latitude:</label>
                    <input 
                        id="LatIn" 
                        type="text" 
                        name="latitude" 
                        value={latitude} 
                        onChange={handleLatitudeChange} 
                    />
                    <label id="Lon">Longitude:</label>
                    <input 
                        id="LonIn" 
                        type="text" 
                        name="longitude" 
                        value={longitude} 
                        onChange={handleLongitudeChange} 
                    />
                    <button type="submit">Submit</button>
                </form>
                
                {rainData && rainData.length > 0 && (
                    <div id="rainDataContainer">
                        <h3>The current rain amount is:</h3>
                        <p>{rainData[currentRain]}mm</p>
                        {rainData[currentRain] > 0 && (
                            <AudioPlayer audioSrc={rain} />
                        )}
                    </div>
                )}
                {/* The lines above first check if a time has been chosen 
                It then checks the array to find the right index for the chosen time
                Then allows users to play rain audio only if playRain is true, if playRain is false the pause/play option will not appear */}
            </main>
        </div>
    );
}