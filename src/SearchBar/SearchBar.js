import React from 'react'
import style from './SearchBar.module.css'

const searchBar = (props)=>
{
    let BtnStatus
    if (!props.ready){
        BtnStatus = true
    } else if (props.ready){
        BtnStatus= false
    }
    return(
        <div>
        
         <div>
             <button disabled={BtnStatus} className={style.Button} onClick={props.currentLocation}> Use My Current Location </button> <span>Or </span>
            <input className={style.Input} type="text" onChange={props.searchQuery} placeholder="Enter a city name"/> <button className={style.Button} onClick = {props.searchLocation}> Search </button>
        </div> 
        </div>
    )
}

export default searchBar