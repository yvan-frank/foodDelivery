import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {

    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    const navigation = useNavigation()

    useEffect(() => {
      ring1padding.value = 0;
      ring2padding.value = 0;

        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100)
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300)

        setTimeout(() => navigation.navigate('Home'), 2500)

    }, [])
    

  return (
    <View className="flex-1 justify-center items-center space-y-10  bg-white">
        <StatusBar style='dark' />
      
      {/* logo image */}
      <Animated.View className="bg-slate-500/20 rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="bg-slate-500/20 rounded-full" style={{padding: ring1padding}}>
            <Image source={require('../../assets/logo.png')} style={{width: 129, height: 67}} />
        </Animated.View>
      </Animated.View>
      {/* title and punchline */}
      <View className="flex items-center space-y-10">
        <Text className="text-slate-800 font-bold tracking-widest text-lg">
            Feel at Home with Us
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen