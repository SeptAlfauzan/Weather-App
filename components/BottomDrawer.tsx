import React, { Component, useEffect, useState } from 'react'
import {Animated, Text, View} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CurrentDetail from '../CurrentDetail'


type Props = {
    temperature: number|null,
    windSpeed: number|null,
    weatherDesc: string|null,
}

// const BottomDrawer: React.FC<Props> = ({children}) => {
const BottomDrawer = (props:Props) => {
    
    return(
        <Animated.View style={[tw`w-full bg-white absolute h-1/3 bottom-0 rounded-t-2xl shadow-lg py-6 px-6`]}>
           <CurrentDetail temperature={props.temperature} windSpeed={props.windSpeed} weatherDesc={props.weatherDesc}/>
        </Animated.View>
    )
}

export default BottomDrawer