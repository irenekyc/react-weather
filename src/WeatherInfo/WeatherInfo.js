import React from 'react'
import style from './WeatherInfo.module.css'
import WeatherIcon from '../WeatherInfo/WeatherIcon'
import HourlyForecast from '../WeatherInfo/HourlyForecast/HourlyForecast'
import DailyForecast from '../WeatherInfo/DailyForecast/DailyForecast'

const weatherInfo =(props)=>{
    let tempUnit=""
    let Weather = {}
    let dailyData
    let hourData
    let eightHourData = []
    let sevenDaysData = []
    let localTime, curDate, curHour
    let curTimeofDate = "AM"
    
    if (props.ready || props.change){
        console.log(props.data)
           Weather ={
                tempnow: props.data.currently.temperature.toFixed(0),
                humidity: (props.data.currently.humidity*100).toFixed(0),
                realFeel: props.data.currently.apparentTemperature.toFixed(0),
                overDes: props.data.currently.summary,
                icon: props.data.currently.icon,
                rainChance: (props.data.currently.precipProbability*100).toFixed(0),
                uvIndex: props.data.currently.uvIndex
            }
    
            curDate = new Date(props.data.currently.time * 1000 ).toLocaleDateString("en-US", {timeZone: props.data.timezone})
            localTime = new Date(props.data.currently.time * 1000 ).toLocaleTimeString("en-US", {timeZone: props.data.timezone})
            curHour = localTime.split(":")[0]
            if (localTime.includes("AM")){
                curTimeofDate = "AM"
            } else if (localTime.includes("PM")){
                curTimeofDate ="PM"
            }
        
    }

  
    if (props.unit === "us"){
        tempUnit = `℉`
   } else if (props.unit === "si"){
        tempUnit = `℃`
   }

           if (props.showHourly){
            hourData = props.data.hourly.data
            hourData.map((hour, index)=>{
                if ( index>=1 && index <= 8){
                    return eightHourData.push(hour)
                } else return;
            })


        }
        if (props.showDaily){
            dailyData = props.data.daily.data
            dailyData.map((day, index)=>{
                if (index >=1 && index <=7){
                    return sevenDaysData.push(day)
                } else return
            })
    
        }
    return(
        <div>
         {props.ready || props.change ? 
         <div className={style.CurrentCard}>
    
                    <p className={style.Big}> <i class="fas fa-location-arrow"></i> {props.city}</p>
                    <p className={style.Normal}> {curDate} {curHour} {curTimeofDate} </p>
                    <p className={style.Bigger}> {Weather.tempnow} <span className={style.Big}>{tempUnit}</span></p>
                    <p className={style.weatherIcon}><WeatherIcon icon={Weather.icon}/></p>
                    <p className={style.Normal}> {Weather.overDes}</p>
                    <p className={style.Normal}> Real Feel: {Weather.realFeel} {tempUnit}</p>
                    <p className={style.Normal}> Humidity: {Weather.humidity} % </p>
                    <p className={style.Normal}> UV: {Weather.uvIndex}</p>
                    <p className={style.Normal}> Chance of rain: {Weather.rainChance} %</p>
                    <br></br>
                    <button onClick={props.hourlyBtn} className={style.Button}> 8 Hours Forecast </button>
                    <button onClick={props.dailyBtn} className={style.Button}> 7 Days Forecast </button>
                <div>   
                    <HourlyForecast unit={tempUnit} timezone={props.data.timezone} data={eightHourData} show={props.showHourly}/> 
                    <DailyForecast unit={tempUnit} timezone={props.data.timezone} data={sevenDaysData} show={props.showDaily}/></div>
                </div>:null}
               </div> 
    )
}

export default weatherInfo