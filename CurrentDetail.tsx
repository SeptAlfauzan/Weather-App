import React from 'react'
import {Image, Text, View} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { SvgCssUri } from 'react-native-svg';
import CelciusIcon from './assets/icons/celsius.svg';
import UmbrellaIcon from './assets/icons/umbrella.svg';
import WindIcon from './assets/icons/wind.svg';
import WaterIcon from './assets/icons/water.svg';

const Icon = (props:any) => <SvgCssUri  width="100%" height="100%" uri={props.url} />;

interface Props{
    temperature: number|null,
    windSpeed: number|null,
    weatherDesc: string|null,
}

const CurrentDetail = (props:Props) => {
    return(
        <View style={tw`w-full flex`}>
            {/* bar */}
            <View style={tw`bg-gray-400 w-1/2 h-1 mx-auto mb-3 rounded`} />

            <Text style={tw`text-black`}>Weather Now</Text>
            <View style={tw`w-full flex flex-row flex-wrap`}>
                <View style={tw`w-1/2 py-3 flex-row`}>
                    <View  style={tw`p-2 rounded-lg bg-blue-50`}>
                        <CelciusIcon width={20} height={20}/>
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={[tw`font-light`, {fontSize:10}]}>Today temperature</Text>
                        <Text style={tw`text-black`}>{props.temperature}</Text>
                    </View>
                </View>
                <View style={tw`w-1/2 py-3 flex-row`}>
                    <View  style={tw`p-2 rounded-lg bg-blue-50`}>
                        <UmbrellaIcon width={20} height={20}/>
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={[tw`font-light`, {fontSize:10}]}>Participance</Text>
                        <Text style={tw`text-black`}>28</Text>
                    </View>
                </View>
                <View style={tw`w-1/2 py-3 flex-row`}>
                    <View  style={tw`p-2 rounded-lg bg-blue-50`}>
                        <WindIcon width={20} height={20}/>
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={[tw`font-light`, {fontSize:10}]}>Wind speed</Text>
                        <Text style={tw`text-black`}>{props.windSpeed}</Text>
                    </View>
                </View>
                <View style={tw`w-1/2 py-3 flex-row`}>
                    <View  style={tw`p-2 rounded-lg bg-blue-50`}>
                        <WaterIcon width={20} height={20}/>
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={[tw`font-light`, {fontSize:10}]}>Humidity</Text>
                        <Text style={tw`text-black`}>28</Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}

export default CurrentDetail