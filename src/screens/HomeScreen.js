import {View, Text, ScrollView, Image, TextInput} from 'react-native'
import React, {useEffect, useState} from 'react'
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const handleChangeCategory = (category) => {
      getRecipes(category)
        setActiveCategory(category)
        setRecipes([])
    }

    //get category
    const getCategory = async () => {
      try {
          const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php")
          //console.log(response.data?.categories)
          if (response && response.data){
              setCategories(response.data?.categories)
          }
      }catch (e) {
          console.log('error ', e.message)
      }
    }
    const getRecipes = async (categoryName = 'Beef') => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
            //console.log('Recipes ==>', response.data?.meals)
            if (response && response.data){
                setRecipes(response.data?.meals)
            }
        }catch (e) {
            console.log('error ', e.message)
        }
    }

    useEffect(() => {
       getCategory()
        getRecipes()
    }, []);

    
    return (
    <View className='bg-white flex-1'>
        <StatusBar style='dark' />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
            className='space-y-0 pt-14'
        >
        {/*avatar*/}
            <View className='mx-4 flex-row justify-between items-center mb-2'>
                <Image source={require('../../assets/avatar1.png')}  />
                <BellIcon size={hp(5)} color='gray' />
            </View>

        {/*    greetings and punchline*/}
            <View className='mx-4 space-y-2 mb-5'>
                <Text style={{fontSize: hp(1.5)}} className='text-slate-500'>Hello Madame !</Text>
                <View>
                    <Text style={{fontSize: hp(3.8)}} className='text-slate-500'>Make your own food,</Text>
                </View>
                <Text style={{fontSize: hp(3.8)}} className='text-slate-500'>
                    stay at <Text className="text-amber-500">home</Text>
                </Text>
            </View>

        {/*    searchbar*/}
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-5">
                <TextInput
                    placeholder='Search any recipe'
                    placeholderTextColor='gray'
                    style={{fontSize: hp(1.7)}}
                    className='flex-1 text-base mb-1 pl-3 tracking-wider'
                />
                <View className='bg-white p-3 rounded-full'>
                    <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray' />
                </View>
            </View>

        {/*    categories*/}
            <View>
                {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
            </View>

        {/*    recipes*/}
            <View>
                <Recipes meals={recipes} categories={recipes} />
            </View>
        </ScrollView>
    </View>
  )
}

export default HomeScreen