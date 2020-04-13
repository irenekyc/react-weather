import React from 'react'

const addressInfo = (props)=>{
    let foundLocations = []
    let searchResult = " "
    if(props.ready){
        searchResult = `There are ${props.locations.length} search results.`
        props.locations.map((location)=>{
            foundLocations.push({
                city: location.place_name,
                long: location.center[0],
                lat: location.center[1],
            })
        })
        console.log(foundLocations)
        } else {
            foundLocations = []
        }


    return (
        <div>
        {searchResult}
        {props.ready? foundLocations.map((location)=>{
            return <p><a onClick={()=> props.confirmedLocation(location)} key={location.city}>{location.city}</a></p> } )
        : null}
     
      </div> 
    )
}

export default addressInfo