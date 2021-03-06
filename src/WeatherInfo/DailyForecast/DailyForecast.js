import React from 'react'
import WeatherCard from '../WeatherCard'

const dailyForecast = (props)=>{
    return (
        <div>
        {props.show? 
        props.data.map((e)=> <WeatherCard  unit={props.unit} timezone = {props.timezone} type={"daily"} data={e} />)
        : null }
         </div>
    )
}

export default dailyForecast