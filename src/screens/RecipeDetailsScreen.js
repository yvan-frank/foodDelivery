import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {CachedImage} from "../helpers/image";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ChevronLeftIcon, ClockIcon, FireIcon} from "react-native-heroicons/outline";
import {HeartIcon, Square3Stack3DIcon, UsersIcon} from "react-native-heroicons/solid";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import Animated, {FadeInDown, FadeIn} from "react-native-reanimated";


export default function RecipeDetailsScreen(props){
	let item = props.route.params;
	const navigation = useNavigation()

	const [mealsData, setMealsData] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
	const [loading, setLoading] = useState(true);
	const getMealsData = async (id) => {
		try {
			const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			//console.log('Meals ==>', response.data.meals)
			if (response && response.data){
				setMealsData(response.data?.meals[0])
				setLoading(false)
			}
		}catch (e) {
			console.log('error ', e.message)
		}
	}

	useEffect(() => {
		getMealsData(item.idMeal)
	}, []);

	const ingredientsIndexes = (meal) => {
	  if (!meal) return [];
	  let indexes = [];
	  for (let i = 1; i<20; i++){
		  if (meal['strIngredient'+i]){
			  indexes.push(i);
		  }
	  }

	  return indexes;
	}

	return(
		<ScrollView
			className={'flex-1 bg-white'}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{paddingBottom: 30}}
		>
			<StatusBar style={'light'} />
		{/*	Recipe Image*/}
			<View className={'flex-row justify-center'}>
				<CachedImage
					uri={item.strMealThumb}
					style={{
						width: wp(97),
						height: hp(40),
						borderRadius: 40,
						borderBottomLeftRadius: 45,
						borderBottomRightRadius: 45,
						marginTop: 2
					}}
				/>
			</View>
			{/*Back Button*/}
			<Animated.View entering={FadeIn.delay(500).duration(2000)} className={'w-full absolute flex-row justify-between items-center pt-14'}>
				<TouchableOpacity onPress={() => navigation.goBack()} className={'p-2 rounded-full bg-white ml-5'}>
					<ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#F8B249'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className={'p-2 rounded-full bg-white mr-5'}>
					<HeartIcon size={hp(3.5)} strokeWidth={2} color={isFavorite ? 'red':'gray'} />
				</TouchableOpacity>
			</Animated.View>

			{/*Meals description*/}
			{
				loading ? (
					<Loading />
				):(
					<View className={'px-4 flex justify-between space-y-4 pt-8'}>
						<Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className={'space-y-2'}>
							<Text style={{fontSize: hp(3)}} className={'font-bold flex-1 text-slate-500'}>
								{mealsData.strMeal}
							</Text>
							<Text style={{fontSize: hp(2)}} className={'font-medium flex-1 text-slate-400'}>
								{mealsData.strArea}
							</Text>
						</Animated.View>
						{/*misc*/}
						<Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className={'flex-row justify-around'}>
							<View className={'flex rounded-full bg-amber-300 p-2'}>
								<View
									style={{height: hp(6.5), width: hp(6.5)}}
									className={'bg-white rounded-full flex items-center justify-center'}
								>
									<ClockIcon size={hp(3)} color={'#565656'} strokeWidth={2.5} />
								</View>
								<View className={'flex items-center py-2 space-y-1'}>
									<Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-500'}>
										35
									</Text>
									<Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-500'}>
										mins
									</Text>
								</View>
							</View>
							<View className={'flex rounded-full bg-amber-300 p-2'}>
								<View
									style={{height: hp(6.5), width: hp(6.5)}}
									className={'bg-white rounded-full flex items-center justify-center'}
								>
									<UsersIcon size={hp(3)} color={'#565656'} strokeWidth={2.5} />
								</View>
								<View className={'flex items-center py-2 space-y-1'}>
									<Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-500'}>
										03
									</Text>
									<Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-500'}>
										Servings
									</Text>
								</View>
							</View>
							<View className={'flex rounded-full bg-amber-300 p-2'}>
								<View
									style={{height: hp(6.5), width: hp(6.5)}}
									className={'bg-white rounded-full flex items-center justify-center'}
								>
									<FireIcon size={hp(3)} color={'#565656'} strokeWidth={2.5} />
								</View>
								<View className={'flex items-center py-2 space-y-1'}>
									<Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-500'}>
										103
									</Text>
									<Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-500'}>
										Cal
									</Text>
								</View>
							</View>
							<View className={'flex rounded-full bg-amber-300 p-2'}>
								<View
									style={{height: hp(6.5), width: hp(6.5)}}
									className={'bg-white rounded-full flex items-center justify-center'}
								>
									<Square3Stack3DIcon size={hp(3)} color={'#565656'} strokeWidth={2.5} />
								</View>
								<View className={'flex items-center py-2 space-y-1'}>
									<Text style={{fontSize: hp(2)}} className={'font-bold text-neutral-500'}>

									</Text>
									<Text style={{fontSize: hp(1.3)}} className={'font-bold text-neutral-500'}>
										Easy
									</Text>
								</View>
							</View>
						</Animated.View>

						{/*Ingredients*/}
						<Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className={'space-y-4'}>
							<Text
								style={{fontSize: hp(2.5)}}
								className={'font-bold flex-1 text-slate-500'}
							>
								Ingredients
							</Text>
							<View className={'space-y-2 ml-3'}>
								{
									ingredientsIndexes(mealsData).map(i => {
										return(
											<View key={i} className={'flex-row space-x-4'}>
												<View
													style={{height: hp(1.5), width: hp(1.5)}}
													className={'rounded-full bg-amber-300'}
												/>

												<View className={'flex-row space-x-2'}>
													<Text
														style={{fontSize: hp(1.7)}}
														className={'font-extrabold text-slate-700'}>{mealsData['strMeasure' +i]}</Text>
													<Text
														style={{fontSize: hp(1.7)}}
														className={'font-medium text-slate-500'}>{mealsData['strIngredient' +i]}</Text>
												</View>
											</View>
										)
									})
								}
							</View>
						</Animated.View>
						{/*Instructions*/}
						<Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className={'space-y-4'}>
							<Text
								style={{fontSize: hp(2.5)}}
								className={'font-bold flex-1 text-slate-500'}
							>
								Instructions
							</Text>
							<Text
								style={{fontSize: hp(1.7)}}
								className={'text-slate-500'}
							>
								{mealsData?.strInstructions}
							</Text>
						</Animated.View>
					</View>
				)
			}

		</ScrollView>
	)
}