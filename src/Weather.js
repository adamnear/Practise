import React, { useState, useEffect } from 'react';
import axios from 'axios';
import rain from './Audio/rain.wav';
import AudioPlayer from './AudioPlayer';

export default function Weather() {
    const [rainData, setRainData] = useState(null);
    const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || ''); //Using the localStorage.getItem function here instead of at the later useEffect function
    const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || ''); //The initial values for latitude and longitude are set directly using localStorage.getItem('latitude') and localStorage.getItem('longitude')
                                                                                        //The "||" operator will be used as a fallback if the values for latitude or longitude are empty 

    const getWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain`);
            const rainData = response.data.hourly.rain; //Fetching rain data within the array, like a folder (data>hourly>rain)
            setRainData(rainData);
        } catch (error) {
            console.log(error);
        }
    };

    //Note the [68], this is becasue it is not forcasting rain at midnight [0] but at the index [68] is forecasting for rain
    //This const is checking if there is currently rain forcasted, if true then the user has the option to play rain audio, if false the play button does not appear
    const checkForRain = () => {
        if (rainData && rainData.length > 0 && rainData[68] > 0) { //Rain must be larger that 0 for this if statement to be true
            return true
        }
        return false;
    };

    useEffect(() => {
        if (latitude && longitude) {
            setLatitude(latitude);
            setLongitude(longitude);
        }
    }, []);

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
                        <h3>Rain in mm:</h3>
                        <p>{rainData[68]}</p> {/* displaying the amount of rain in mm based on the index of the array */}
                    </div>
                )}
                {checkForRain() && <AudioPlayer audioSrc={rain} />} {/* This line allows users to play rain audio only if playRain is true, if playRain is false the pause/play option will not appear */}
            </main>
        </div>
    );
}