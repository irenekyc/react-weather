import React, {useState, useEffect} from 'react'
import style from './layout.module.css'
import SearchBar from '../SearchBar/SearchBar'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import AddressInfo from '../AddressInfo/AddressInfo'
import UnitOption from '../UnitOption/UnitOption'

const Layout = ()=>{
    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)
    const [weatherdata, setWeatherdata] = useState(null)
    const [searchAddress, setSearchAddress]= useState(" ")
    const [searchLocation, setSearchLocation]= useState("")
    const [locations, setLocation] = useState(null)
    const [weatherdataReady, setWeatherdataReady] = useState(false)
    const [locationsReady, setLocationsReady] = useState(false)
    const [showHourly, setShowHourly] = useState(false)
    const [showDaily, setShowDaily] = useState(false)
    const [unit, setUnit] = useState("imperial")
    const CorsFixed = `https://cors-anywhere.herokuapp.com/`
    const WeatherAPIKEY = process.env.REACT_APP_DARKSKYAPI_KEY
    const MAPAPI = process.env.REACT_APP_MAP_API_KEY
    const WEATHERURL = `${CorsFixed}https://api.darksky.net/forecast/${WeatherAPIKEY}/`

  
        useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
          setError('Geolocation is not supported');
          return;
        }
        const watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
      }, []);

    const onChange = ({coords}) => {
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      };
      const onError = (error) => {
        setError(error.message);
      };

    const fetchData = async ()=>{
        resetData()
        if (position.longitude && position.latitude){
            const URL = `${WEATHERURL}${position.latitude},${position.longitude}`
            const response= await fetch(URL)
            const data = await response.json()
            setWeatherdata({data})
            setWeatherdataReady(true)       
        }
        getCity()
    }

    const resetData = ()=>{
        setWeatherdata(null)
        setWeatherdataReady(false)
        setLocationsReady(false)
        setLocation(null)
        setShowHourly(false)
        setShowDaily(false)
    }

    const getAddress = (event)=>{
        setSearchAddress(event.target.value)
    }

    const getCity = async ()=>{
      const GEOURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.longitude},${position.latitude}.json?types=place&access_token=${MAPAPI}&limit=1`
      const response = await fetch(GEOURL)
      const data = await response.json()
      setSearchLocation(data.features[0].place_name)
    }


    const fetchLocation = async ()=>{
        resetData()
        let GEOURL = ""
        if(searchAddress){
         GEOURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAddress}.json?types=place&access_token=${MAPAPI}`}
        const response = await fetch(GEOURL)
        const data = await response.json()
        const locations = data.features
        setLocation(locations)
        setLocationsReady(true)}
        
       
    const fetchWeather = async (location)=>{
        resetData()
        const URL = `${WEATHERURL}${location.lat},${location.long}`
        const response= await fetch(URL)
        const data = await response.json()
        setWeatherdata({data})
        setWeatherdataReady(true)
        setSearchLocation(location.city)

    }

    const getUnit = ()=>{
      const curUnit = unit
      if (curUnit === "imperial"){
       setUnit("metric")
      }
      if (curUnit === "metric"){
        setUnit("imperial")
      }
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
            <div className={style.Header}>
                Irene's Weather App
            </div>
            <div className={style.NavBar}>
              <UnitOption 
              unitChange = {getUnit}
              curUnit={unit}/>
            </div>
            <div className={style.SearchBar}>
            <SearchBar 
            currentLocation = {fetchData}
            searchLocation = {fetchLocation}
            searchQuery = {getAddress}/>
            </div>
            <div className={style.MainContent}>
            <WeatherInfo 
            ready = {weatherdataReady}
            data = {weatherdata}
            city={searchLocation}
            unit = {unit}
            hourlyBtn = {hourlyForecastHandler}
            showHourly = {showHourly}
            dailyBtn = {dailyForecastHandler}
            showDaily = {showDaily}/>
            <AddressInfo 
            locations = {locations}
            ready={locationsReady}
            confirmedLocation = {(location)=> fetchWeather(location)}
            />
            </div>
        </div>
     )
    
    }

export default Layout