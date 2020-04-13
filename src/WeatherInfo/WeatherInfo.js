import React from 'react'

const weatherInfo =(props)=>{
    let Weather = {}
    if (props.ready){
        Weather = {
            tempnow: props.data.data.main.temp,
            realFeel: props.data.data.main.feels_like,
            overDes: props.data.data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${props.data.data.weather[0].icon}@2x.png`
        }
    } 
    return(
        <div className = "WeatherInfo">
            {props.ready? 
            <div>
               <p> {props.city}</p>
               <img src={Weather.icon} />
               <p> {Weather.overDes}</p>
               <p> Temperature now: {Weather.tempnow}</p>
               <p> Real Feel: {Weather.realFeel}</p>
            </div> 
            :null}
          
           
        </div>
    )
}

export default weatherInfo