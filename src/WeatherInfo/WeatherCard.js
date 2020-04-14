import React from 'react'
import WeatherIcon from './WeatherIcon'

const weatherCard = (props)=>{
    let hour
    let timeofDate
    let date
    let day
    if (props.type==="hourly"){
        const time = new Date(props.data.time*1000).toLocaleTimeString("en-US", {timeZone: props.timezone})
        hour = time.split(":")[0]
         if (time.includes("AM")){
            timeofDate = "AM"
         } else if (time.includes("PM")){
            timeofDate = "PM"
         }
    }

    if(props.type ==="daily") {
        const time = new Date(props.data.time*1000).toLocaleDateString("en-US", {timeZone: props.timezone})
        date = time
        const dayIndex = new Date(new Date(props.data.time*1000).toLocaleString("en-US", {timeZone: props.timezone})).getDay()
        day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'][dayIndex]
    }
    return (
        <div>
        <WeatherIcon icon={props.data.icon} />
        <p> {props.data.summary} </p>
        <p> {hour} {timeofDate} </p>
        <p> {date} , {day}</p>

        </div>
    )
}

export default weatherCard