import React from 'react'
import WeatherIcon from './WeatherIcon'
import style from './WeatherCard.module.css'

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
        <div className={style.WeatherCARD}>
            {props.type==="hourly"? 
            <div>
            <div className={style.TIME}>
                <p > {hour} {timeofDate} </p>
            </div>
            <div className={style.SUMMARY}>  
            <p className={style.ICON}><WeatherIcon icon={props.data.icon} /></p>
            <p className={style.BOLD}> {props.data.summary} </p>
            <p className={style.BOLD}> {props.data.temperature.toFixed(0)} {props.unit} </p>
            </div>
            </div> :
            <div>   
                 <div>
            <div className={style.TIME}>
                <p > {date}, {day} </p>
            </div>
            <div className={style.SUMMARY}>  
            <p className={style.ICON}><WeatherIcon icon={props.data.icon} /></p>
            <p > {props.data.temperatureLow.toFixed(0)} / {props.data.temperatureHigh.toFixed(0)}  {props.unit} </p>
            </div>
            
            <p > {props.data.summary} </p>
            </div>
        </div>}
        </div>
    )

}

export default weatherCard