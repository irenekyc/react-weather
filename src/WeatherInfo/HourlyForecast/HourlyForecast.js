import React from 'react'
import WeatherCard from '../WeatherCard'


const hourlyForecast = (props)=>{
    
    return (
        <div>
        {props.show? 
            props.data.map((e)=><WeatherCard unit={props.unit} type="hourly" timezone={props.timezone} data={e}/>)
           
        : null }
       
         </div>
    )
}

export default hourlyForecast