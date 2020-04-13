import React from 'react'
import style from './AddressInfo.module.css'

const addressInfo = (props)=>{
    let foundLocations = []
    let searchResult = " "
    if(props.ready){
        searchResult = props.locations.length
        props.locations.map((location)=>{
            foundLocations.push({
                city: location.place_name,
                long: location.center[0],
                lat: location.center[1],
            })
        })
        } else {
            foundLocations = []
        }


    return (
        <div>
        {props.ready?
        <div className={style.SearchResultContainer}>
        <p> There are <span className={style.Strong}>{searchResult}</span> search results</p> 
            {foundLocations.map((location)=>{
            return <p className={style.ClickButton}><a onClick={()=> props.confirmedLocation(location)} key={location.city}>{location.city}</a></p> } )}
        </div>
        : null}
     
      </div> 
    )
}

export default addressInfo