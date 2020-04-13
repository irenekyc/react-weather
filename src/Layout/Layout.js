import React, {useState, useEffect} from 'react'
import style from './layout.module.css'
import SearchBar from '../SearchBar/SearchBar'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import AddressInfo from '../AddressInfo/AddressInfo'

const Layout = ()=>{

    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)
    const [weatherdata, setWeatherdata] = useState(null)
    const [searchAddress, setSearchAddress]= useState(" ")
    const [searchLocation, setSearchLocation]= useState("")
    const [locations, setLocation] = useState(null)
    const [weatherdataReady, setWeatherdataReady] = useState(false)
    const [locationsReady, setLocationsReady] = useState(false)
    const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY
    const MAPAPI = process.env.REACT_APP_MAP_API_KEY
    const WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?`

    useEffect(() => {
        console.log(weatherdataReady)
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
        setWeatherdata(null)
        setWeatherdataReady(false)
        if (position.longitude && position.latitude){
            const URL = `${WEATHERURL}lat=${position.latitude}&lon=${position.longitude}&appid=${WeatherAPIKEY}&units=imperial`

            const response= await fetch(URL)
            const data = await response.json()
            setWeatherdata({data})
            setWeatherdataReady(true)
        }
    }

    const getAddress = (event)=>{
        setSearchAddress(event.target.value)
    }
    const fetchLocation = async ()=>{
        setWeatherdataReady(false)
        setLocationsReady(false)
        setLocation(null)
        if(searchAddress){
        const GEOURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAddress}.json?types=place&access_token=${MAPAPI}`
        console.log(GEOURL)
        const response = await fetch(GEOURL)
        const data = await response.json()
        const locations = data.features
        setLocation(locations)
        setLocationsReady(true)}}

    const fetchWeather = async (location)=>{
        setLocationsReady(false)
        setWeatherdataReady(false)
        setWeatherdata(null)
        const URL = `${WEATHERURL}lat=${location.lat}&lon=${location.long}&appid=${WeatherAPIKEY}&units=imperial&lang=zh_cn`
        const response= await fetch(URL)
        const data = await response.json()
        setWeatherdata({data})
        setWeatherdataReady(true)
        setSearchLocation(location.city)
    }

     return(
     
        <div className={style.WebContainer}> 
            <div className={style.Header}>
                Irene's Weather App
            </div>
            <div className={style.NavBar}>
                <span>Language Option: </span>
                <span> Unit Option: </span>
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
            city={searchLocation}/>
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