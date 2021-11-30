import React, { useEffect, useRef, useState } from 'react'
import {View, Text, PermissionsAndroid, Platform, RefreshControl, TouchableOpacity, ScrollViewBase, ScrollView} from 'react-native';
import {GetCurrentLocation, GetCurrentLocationName} from './lib/Location'
import { GetWeather } from './lib/Weather';
import tw from 'tailwind-react-native-classnames';
import BottomDrawer from './components/BottomDrawer';
import Geolocation from 'react-native-geolocation-service';
import CurrentDetail from './CurrentDetail';
import { getCurrentPosition } from 'react-native-geolocation-service';
import Icons from './components/Icons';


const Location = () => {
    
    interface Location {
        latitude: number|null;
        longtitude: number|null;
    }
    interface WeatherData {
        name: string|null;
        weather_desc: string|null;
        temp: number|null;
        wind_speed: number|null;
        icon: string|null;
    }

    const [locPermission, setLocPermission] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>({latitude: null, longtitude:null});
    const [tes, setTes] = useState(false);
    const [dataWeather, setDataWeather] = useState<WeatherData>({name:null, weather_desc: null, temp: null, wind_speed: null, icon: null})
    const [loading, setloading] = useState<boolean>(true)

    const locRef = useRef<Location>()
    locRef.current = location
    
    const SetLocation = () => {
        Geolocation.getCurrentPosition(position => {
            const latitude:number = position.coords.latitude
            const longtitude:number = position.coords.longitude
            const result:Location = {latitude, longtitude}
            setLocation(result)
            console.log('location has been change', location)
        }, (error)=>{
            console.log(error.code, error.message)
            const result: Location = {latitude: null, longtitude: null}
            setLocation(result)
        }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        })
    }
    const getLocationPermission = async ():Promise<boolean> =>{
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    title: "Test get location permission",
                    message: "Can i get your permission plz",
                    buttonNeutral: "Ask me later",
                    buttonPositive: "Yes",
                    buttonNegative: "Fuck no"
                }
                );
                
                if(granted === PermissionsAndroid.RESULTS.GRANTED){

                    Geolocation.getCurrentPosition(position => {
                        const latitude:number = position.coords.latitude
                        const longtitude:number = position.coords.longitude
                        
                        setLocation({latitude, longtitude})
                        console.log('location has been change', location)
                        return true
                    }, (error)=>{
                        console.log(error.code, error.message)
                        const result: Location = {latitude: null, longtitude: null}
                        setLocation(result)
                        return false
                    }, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000
                    })
                    console.log(location)
                }else{
                    console.log("try it later");
                }
            } catch (error) {
                console.warn(error);
            }
            return false
    }

    const GetNewData = async () => {
        // console.log('data weather', dataWeather)
        setTes(true);
        setloading(true);
        getLocationPermission()
        // console.warn('location state', locRef)
        // return
        // if (isGranted) {
            const res = await GetWeather(location.latitude || locRef.current?.latitude, location.longtitude || locRef.current?.longtitude)
            if (res != undefined) {
                const {name, weather, main, wind} = res
                const weather_desc:string = weather[0].description
                const icon:string = weather[0].icon
                const temp:number = main.temp
                const wind_speed:number = wind.speed
                const data:WeatherData = {
                    name,
                    weather_desc,
                    temp,
                    wind_speed,
                    icon
                }
                console.log('data', data)
                setDataWeather(data)
            }
            // }
            setTes(false)
            setloading(false);
        }
        
        const ubahCoba = () => {
            setTimeout(()=>{
                GetNewData()
        }, 1000)
    }
    
    useEffect(() => {
        // GetNewData()
        ubahCoba()
        if (Platform.OS == 'android'){
        getLocationPermission();
        }
    }, []);
    
    return (
        <View style={tw`h-full`}>
            <ScrollView style={tw`h-full flex-1 bg-blue-200`} refreshControl={<RefreshControl refreshing={tes} onRefresh={GetNewData}/>}>
               {loading? <Text>Get data from API</Text> : 
                <>
                <View style={tw`h-1/4 flex flex-row px-5 my-4`}>
                    <View style={tw`w-5/6 flex`}>
                        <Text style={tw`font-bold`}>{dataWeather.name}</Text>
                        <Text style={tw`font-light`}>24 November 2021</Text>
                    </View>
                    <View style={tw`w-1/6 flex items-center`}>
                        <TouchableOpacity style={tw` px-3`}>
                            <Text style={tw`font-bold text-3xl`}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={tw`h-3/4 flex flex-row  px-5`}>
                    <View style={tw`w-1/2 flex`}>
                        <Text style={tw`font-bold`}>Monday</Text>
                        <Icons arg={dataWeather.icon || null}/>
                        <Text style={tw``}>{dataWeather.weather_desc}</Text>
                    </View>
                    <View style={tw`w-1/2 text-center`}>
                        <Text style={[tw`text-black text-center`, {fontSize: 100}]}>{dataWeather.temp != null? Math.floor(dataWeather.temp) : '00'}'</Text>
                    </View>
                </View>
                </>
               }
               
            </ScrollView>
            <BottomDrawer temperature={dataWeather.temp} windSpeed={dataWeather.wind_speed} weatherDesc={dataWeather.weather_desc}/>
        </View>
    )
}

export default Location;