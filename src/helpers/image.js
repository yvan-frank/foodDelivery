import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";
import {View, Image} from "react-native"

export const CachedImage = (props) => {
	const [cachedSource, setCachedSource] = useState(null);
	const { uri } = props;

	useEffect(() => {
		const getCachedImage = async () => {
		    try {
			    const cachedImageData = await AsyncStorage.getItem(uri);
				if (cachedImageData){
					setCachedSource({uri: cachedImageData});
				}else {
					const response = await fetch(uri);
					const imgBlob = await response.blob();
					const base64Data = await new Promise((resolve) => {
						const reader = new FileReader();
						reader.readAsDataURL(imgBlob);
						reader.onloadend = () => {
							resolve(reader.result);
						}
					});
					await AsyncStorage.setItem(uri, base64Data);
					setCachedSource({uri: base64Data})
				}
		    }catch (e) {
			    console.error('Error caching Image', e)
			    setCachedSource({uri})
		    }
		};
		getCachedImage();
	}, []);
	return <Animated.Image source={cachedSource} {...props} />
}