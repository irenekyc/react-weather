import React from 'react'

const weatherInfo =(props)=>{
    let Weather = {}
    if (props.ready){
        console.log(props.data)
    } 
    return(
        <div className = "WeatherInfo">
            {props.ready? <div>
               <p> Data is ready</p>
            </div> 
            :null}
          
           
        </div>
    )
}

export default weatherInfo