interface Weather{
    main: string;
    description: string;
}
const GetWeather = async (lat:number|null|undefined, lon:number|null|undefined) => {
    if(lat != null && lon != null){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=cd31e3ea52a7a6493be5a024e3b46f8e`);
        // const {name, weather, main, wind} = res.json()
        return res.json()
    } 
}

export {
    GetWeather
}