import React, { useState, useEffect } from 'react';
import axios from 'axios';
import rain from './Audio/rain.wav';
import AudioPlayer from './AudioPlayer';

export default function Weather() {
    const [rainData, setRainData] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || ''); //Using the localStorage.getItem function here instead of at the later useEffect function
    const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || ''); //The initial values for latitude and longitude are set directly using localStorage.getItem('latitude') and localStorage.getItem('longitude')
                                                                                        //The "||" operator will be used as a fallback if the values for latitude or longitude are empty 

    const getWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain`);
            const rainData = response.data.hourly.rain; //Fetching rain data within the array, like a folder (data>hourly>rain)
            setRainData(rainData);
            setSelectedTime(response.data.hourly.time[0]);
            console.log(rainData);
        } catch (error) {
            console.log(error);
        }
    };

    //Note the [68], this is becasue it is not forcasting rain at midnight [0] but at the index [68] is forecasting for rain
    //This const is checking if there is currently rain forcasted, if true then the user has the option to play rain audio, if false the play button does not appear

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

        const handleTimeChange = (event) => {
            const selectedTime = event.target.value;
            const index = convertTimeToIndex(selectedTime);
            setSelectedTime(index);
          };

        const convertTimeToIndex = (time) => {
            // This will display rainData even if there is 0mm forecasted
            const hour = parseInt(time.split(':')[0], 10); //10 represents the decimal places
            const index = hour % 24;
            return index;
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
                        <h3>Rain amount for chosen time...</h3>
                        <select onChange={handleTimeChange}>
                            <option value="">Choose a time...</option>
                            <option value="24:00">24:00</option>
                            <option value="1:00">1:00</option>
                            <option value="2:00">2:00</option>
                            <option value="3:00">3:00</option>
                            <option value="4:00">4:00</option>
                            <option value="5:00">5:00</option>
                            <option value="6:00">6:00</option>
                            <option value="7:00">7:00</option>
                            <option value="8:00">8:00</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </select>
                        <p>{rainData[selectedTime]}mm</p>
                        {selectedTime !== null && rainData[selectedTime] > 0 && (
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