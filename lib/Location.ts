import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Location from '../Location';

interface Location {
    latitude: number|null;
    longtitude: number|null;
}

let location:Location = {
    latitude: null,
    longtitude: null
}

const setLocation = (latitude:number|null, longtitude:number|null):void => {location = {latitude, longtitude}}
const getLocation = ():Location => location

const GetCurrentLocation = async():Promise<Location>  => {

    Geolocation.getCurrentPosition(position => {
        const latitude:number = position.coords.latitude
        const longtitude:number = position.coords.longitude
        // console.log(typeof position)
        setLocation( latitude, longtitude)
    }, (error)=>{
        setLocation( null, null)
        console.log(error.code, error.message)
    }, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
    })

    return getLocation();
}

const GetCurrentLocationName = (latitude:number|null, longtitude:number|null) => {
    if(latitude == null || longtitude == null) {
        return false
    }else{
        Geocoder.from(latitude, longtitude).then(json=>{
            console.log(json.results[0])
        }).catch(err=>console.log(err))
    }
}

const test = () => console.log("test from lib")

export {
    GetCurrentLocation,
    GetCurrentLocationName,
    test
}