import React from "react"
import {View, Text, ActivityIndicator} from "react-native"

export default function Loading ({props}) {
	return(
		<View className={'flex-1 flex justify-center items-center'}>
			<ActivityIndicator size="large" className='mt-20' color='#F8B249' />
		</View>
	)
}