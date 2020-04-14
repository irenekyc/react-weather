import React, { useState, useEffect } from 'react'
import style from './WeatherInfo.module.css'
import WeatherIcon from './WeatherIcon'
import HourlyForecast from './HourlyForecast/HourlyForecast'
import DailyForecast from './DailyForecast/DailyForecast'



const weatherInfo = (props) =>{
    let tempUnit = ""
    let Weather = {}
    let dailyData
    let hourData
    let eightHourData = []
    let sevenDaysData = []
        if (props.ready){
            Weather ={
                tempnow: props.data.data.currently.temperature.toFixed(0),
                humidity: (props.data.data.currently.humidity*100).toFixed(0),
                realFeel: props.data.data.currently.apparentTemperature.toFixed(0),
                overDes: props.data.data.currently.summary,
                icon: props.data.data.currently.icon,
                rainChance: props.data.data.currently.precipProbability.toFixed(0),
                uvIndex: props.data.data.uvIndex
            }
           
        } 
        if (props.showHourly){
            hourData = props.data.data.hourly.data
            hourData.map((hour, index)=>{
                if ( index>=1 && index <= 8){
                    return eightHourData.push(hour)
                } else return;
            })


        }
        if (props.showDaily){
            dailyData = props.data.data.daily.data
            dailyData.map((day, index)=>{
                if (index >=1 && index <=7){
                    return sevenDaysData.push(day)
                } else return
            })
    
        }

        if (props.unit === "imperial"){
            tempUnit = `℉`
       } else if (props.unit === "metric"){
            tempUnit = `℃`
       }

    
    return(
        <div>
        {props.ready? 
        <div className={style.CurrentCard}>
               <p className={style.Big}> <i class="fas fa-location-arrow"></i> {props.city}</p>
               <p className={style.Bigger}> {Weather.tempnow} {tempUnit}</p>
               <p className={style.weatherIcon}><WeatherIcon icon={Weather.icon}/></p>
               <p className={style.Normal}> {Weather.overDes}</p>
               <p className={style.Normal}> Real Feel: {Weather.realFeel} {tempUnit}</p>
               <p className={style.Normal}> Humidity: {Weather.humidity} % </p>
               <br></br>
               <button onClick={props.hourlyBtn} className={style.Button}> 8 Hours Forecast </button>
               <button onClick={props.dailyBtn} className={style.Button}> 7 Days Forecast </button>
               <div>
                    <HourlyForecast timezone={props.data.data.timezone} data={eightHourData} show={props.showHourly}/> 
                    <DailyForecast timezone={props.data.data.timezone} data={sevenDaysData} show={props.showDaily}/>
               </div>
             
        </div>
            :null}
        
          
      </div>
      
    )
        }

export default weatherInfo