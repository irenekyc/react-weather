import React from 'react'
import style from './WeatherInfo.module.css'

const weatherInfo =(props)=>{
    let Weather = {}
    if (props.ready){
        Weather = {
            tempnow: props.data.data.main.temp.toFixed(0),
            tempMin: props.data.data.main.temp_min.toFixed(0),
            tempMax: props.data.data.main.temp_max.toFixed(0),
            humidity: props.data.data.main.humidity,
            realFeel: props.data.data.main.feels_like.toFixed(0),
            overDes: props.data.data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${props.data.data.weather[0].icon}@2x.png`
        }
    } 
    let tempUnit
    if (props.unit === "imperial"){
         tempUnit = ` ℉`
    } else if (props.unit === "metric"){
         tempUnit = `℃`
    }
    return(
        <div>
        {props.ready? 
        <div className={style.CurrentCard}>
               <p className={style.Big}> <i class="fas fa-location-arrow"></i> {props.city}</p>
               <p className={style.Big}> {Weather.tempnow} {tempUnit}</p>
               <img src={Weather.icon}  alt=""/>
               <p className={style.Normal, style.textBeauty}> {Weather.overDes}</p>
               <p className={style.Normal}> Real Feel: {Weather.realFeel} {tempUnit}</p>
               <p className={style.Normal}> {Weather.tempMin} / {Weather.tempMax} {tempUnit} </p>
               <p className={style.Small}> Min / Max </p>
               <p className={style.Normal}> Humidity: {Weather.humidity} % </p>
               <br></br>
               <button className={style.Button}> 5 Hours Forecast </button>
               <button className={style.Button}> 3 Days Forecast </button>
        </div>
            :null}
          
      </div>
      
    )
}

export default weatherInfo