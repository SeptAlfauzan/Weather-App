import React, { useEffect, useState } from "react"
import Icon01 from '../assets/icons/weathers/sun.svg'
import Icon02 from '../assets/icons/weathers/cloudy-day.svg'
import Icon03 from '../assets/icons/weathers/cloud.svg'
import Icon04 from '../assets/icons/weathers/clouds.svg'
import Icon09 from '../assets/icons/weathers/rain.svg'
import Icon10 from '../assets/icons/weathers/weather.svg'
import Icon11 from '../assets/icons/weathers/storm.svg'
import Icon13 from '../assets/icons/weathers/snow.svg'
import Icon50 from '../assets/icons/weathers/smoke.svg'
import { View } from "react-native"
import { Text } from "react-native-svg"

interface IconsType{
    id: string,
    element: JSX.Element
}
interface Props{
    arg: string | null
}
const icons: IconsType[] = [
    {
        id: '01d',
        element: <Icon01 width={35} height={35}/>
    },
    {
        id: '02d',
        element: <Icon02 width={35} height={35}/>
    },
    {
        id: '03d',
        element: <Icon03 width={35} height={35}/>
    },
    {
        id: '04d',
        element: <Icon04 width={35} height={35}/>
    },
    {
        id: '09d',
        element: <Icon09 width={35} height={35}/>
    },
    {
        id: '10d',
        element: <Icon10 width={35} height={35}/>
    },
    {
        id: '11d',
        element: <Icon11 width={35} height={35}/>
    },
    {
        id: '13d',
        element: <Icon13 width={35} height={35}/>
    },
    {
        id: '50d',
        element: <Icon50 width={35} height={35}/>
    },
]

const Icons = (props:Props) => {
    const [icon, setIcon] = useState<IconsType>()

    const getIcon = (arg:string) => {
        const results = icons.filter(icon => icon.id == arg)
        return results
    }
    useEffect(()=>{
        if(props.arg !== null){
            const result = getIcon(props.arg)   
            setIcon(result[0])
        }
        // console.log(result[0].id)
    },[])
    return <View>{icon? icon.element : <Text>no connection</Text>}</View>
}

export default Icons