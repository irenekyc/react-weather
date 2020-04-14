import React from 'react'


const weatherIcon = (props)=>{
    let fontAwesomeIcon = " "
    switch(props.icon){
        case('clear-day'):
            fontAwesomeIcon = 'fas fa-sun'
            break;
        case('clear-night'): 
            fontAwesomeIcon = 'fas fa-moon'
            break;
        case('cloudy'):
            fontAwesomeIcon = 'fas fa-cloud'
            break;
        case('fog'):
            fontAwesomeIcon = 'fas fa-smog'
            break;
        case('partly-cloudy-day'):
            fontAwesomeIcon = ' fas fa-cloud-sun'
            break;
        case('partly-cloudy-night'):
            fontAwesomeIcon = ' fas fa-cloud-moon'
            break;
        case('rain'):
            fontAwesomeIcon = ' fas fa-cloud-rain'
            break;
        case('sleet'):
            fontAwesomeIcon= 'fas fa-snowflake'
            break;
        case('snow'):
            fontAwesomeIcon= 'fas fa-snowflake'
            break;
        case('wind'):
            fontAwesomeIcon = 'fas fa-wind'
       
        
}
return (
    <i class={fontAwesomeIcon}></i>
)
}
export default weatherIcon;