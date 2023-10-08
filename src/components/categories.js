import {ScrollView, TouchableOpacity, View, Image, Text} from "react-native";
import {categoryDate} from "../constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from "react-native-reanimated";
import {CachedImage} from "../helpers/image";


export default function Categories({categories,activeCategory, handleChangeCategory}){
	return(
		<Animated.View entering={FadeInDown.duration(500).springify()}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="space-x-4"
				contentContainerStyle={{paddingHorizontal: 15}}
			>
				{
					categories.map((data, key) => {
						let isActive = data.strCategory === activeCategory;
						let activeButtonClass = isActive ? 'bg-amber-400': 'bg-black/10'
						return(
							<TouchableOpacity
								key={key}
								className={'flex items-center space-y-1'}
								onPress={() => handleChangeCategory(data.strCategory)}
							>
								<View className={`rounded-full p-[10px] ${activeButtonClass}`}>
									{/*<Image*/}
									{/*	source={{uri: data.strCategoryThumb}}*/}
									{/*	style={{width: hp(6), height: hp(6)}}*/}
									{/*	className={'rounded-full'}*/}
									{/*/>*/}
									<CachedImage
										uri={data.strCategoryThumb}
										style={{width: hp(6), height: hp(6)}}
										className={'rounded-full'}
									/>
								</View>
								<Text className={'text-slate-500'} style={{fontSize: hp(1.6)}}>
									{data.strCategory}
								</Text>
							</TouchableOpacity>
						)
					})
				}
			</ScrollView>
		</Animated.View>
	)
}