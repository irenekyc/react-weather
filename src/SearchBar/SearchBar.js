import React from 'react'

const searchBar = (props)=>
{
    return(
        <div>
        <button onClick={props.currentLocation}> Use My Current Location </button> <span>Or </span>
        <input type="text" onChange={props.searchQuery}/> <button onClick = {props.searchLocation}> Search </button>
        </div>
    )
}

export default searchBar