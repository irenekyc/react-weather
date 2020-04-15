import React, {useState, useEffect} from 'react'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import style from './layout.module.css'
import SearchBar from '../SearchBar/SearchBar'
import AddressInfo from '../AddressInfo/AddressInfo'

const Layout = ()=>{
  const [position, setPosition] = useState({ready:false});
  const [WeatherData, setWeatherData] = useState()
  const [WeatherDataReady, setWeatherDataReady]= useState(false)
  const [resultLocations, setResultLocations] = useState({ready:false})
  const [City, setCity]=useState()
  const [unit, setUnit]= useState("us")
  const [searchQuery, setSearchQuery]= useState()
  const [error, setError] = useState(null);
  const [showHourly, setShowHourly] = useState(false)
  const [showDaily, setShowDaily] = useState(false)

  const MAPAPI = process.env.REACT_APP_MAP_API_KEY
  let LA, LON

  const resetSearchResult= ()=>{
    setResultLocations ({ready:false, data:null})
 
  }

  const resetWeatherContainer =()=>{
    setWeatherData(null)
    setWeatherDataReady(false)
    setShowDaily(false)
    setShowHourly(false)
  }
  const onChange = ({coords}) => {
   
    setPosition({
      lat: coords.latitude,
      long: coords.longitude,
    ready: true
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
   const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
 
const getWeather =async (lat,long)=>{
  resetSearchResult()
  resetWeatherContainer()
  if(!lat || !long){
    LA = position.lat
    LON = position.long
  } else {
    LA = lat
    LON = long
  }
  const oldWeather = WeatherData
  const CorsFixed = `https://cors-anywhere.herokuapp.com/`
  const WeatherAPIKEY = process.env.REACT_APP_DARKSKYAPI_KEY
  const URL = `${CorsFixed}https://api.darksky.net/forecast/${WeatherAPIKEY}/${LA},${LON}?units=${unit}`
  const response = await fetch(URL)
  const data = await response.json()
  const newWeatherData = data
  setWeatherData(newWeatherData)
  setWeatherDataReady(true)
  getCity(lat, long)
}

const getCity = async (lat, long)=>{
  if(!lat || !long){
    LA = position.lat
    LON = position.long} 
    else {
      LA = lat
      LON = long
    }
  setCity("")
  const GEOURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${LON},${LA}.json?types=place&access_token=${MAPAPI}`
  const response = await fetch(GEOURL)
  const data = await response.json()
  setCity(data.features[0].place_name)
}

const getSearchQuery = (event)=>{
  setSearchQuery(event.target.value)
}

const searchLocations = async ()=>{
  resetWeatherContainer()
  let GEOURL
  if(searchQuery){
   GEOURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?types=place&access_token=${MAPAPI}`}
   const response = await fetch(GEOURL)
   const data = await response.json()
   const locations = data.features
   setResultLocations({
     data: locations,
     ready: true
   })
 }

 const selectedLocation = (location)=>{
    const oldPosition = position
    getWeather(location.lat,location.long)
 }

 const hourlyForecastHandler = ()=>{
  if (showHourly === false){
    setShowHourly(true)
  } else if (showHourly === true){
    setShowHourly(false)
  }
}
const dailyForecastHandler = ()=>{
  if (showDaily === false){
    setShowDaily(true)
  } else if (showDaily === true){
    setShowDaily(false)
  }
}

  return(
      <div className={style.WebContainer}> 

          <div className={style.NavBar}>
            <div className={style.FloatLEFT}>
            <span className={style.heading}> Weather Forecast </span><span className={style.Normal}> Design by Irene K.</span> 
            </div>
            {/* <div className = {style.FloatRIGHT}>
            <UnitOption 
            unitChange = {getUnit}
            curUnit={unit}/>
            </div> */}
            </div>
            <div className={style.SearchBar}>
              <SearchBar 
              ready={position.ready}
              currentLocation = {getWeather}
              searchLocation = {searchLocations}
              searchQuery = {getSearchQuery}
              />
            </div>
          <WeatherInfo 
              ready = {WeatherDataReady}
              data = {WeatherData}
              city={City}
              unit = {unit}
              hourlyBtn = {hourlyForecastHandler}
              showHourly = {showHourly}
              dailyBtn = {dailyForecastHandler}
              showDaily = {showDaily}
              />
            <AddressInfo 
            ready={resultLocations.ready}
            result = {resultLocations.data}
            confirmedLocation  = {(location)=>selectedLocation(location)}/>
            </div>
  )

          }
export default Layout