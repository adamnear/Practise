/*TO DO:
-Research Set Interval
-Auto update the time ever 1000 miliseconds using set intervals
-UseEffect() to store and update time data on change
-Decide where to put the useEffect() state (Here or in App.js)
-Where state is held depends on if it is necissary for other parts of the app to know the time
-Only display hour and minute
*/

import React, { useEffect } from "react";

export default function AppClock({ localTime, setLocalTime }) {

    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date();
            const hourOfDay = time.getUTCHours();
            const minuteOfHour = time.getUTCMinutes().toString().padStart(2, "0"); //.padStart is used to add the "0" at the start since the required length of the dtring is 2
            const secondOfMinute = time.getUTCSeconds().toString().padStart(2, "0"); //The time has to be changed .toString before the pad can be added
            const offsetHour = time.getTimezoneOffset() /60; //getTimezoneOffset() shows the offset from UTC time in minutes (ex: Halifax is -180 mins from UTC)
            const localHour = hourOfDay-offsetHour;

            setLocalTime(`${localHour}:${minuteOfHour}:${secondOfMinute}`);
        }, 1000); //Auto updates every second

        return () => {
            clearInterval(interval);
        };
    },[]);

    return (
        <div>
            <main id="clock">
                <h3>The local time is: {localTime}</h3>
            </main>
        </div>
    )
}