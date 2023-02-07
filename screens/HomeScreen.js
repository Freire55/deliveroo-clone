import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import {ChevronDownIcon,UserIcon, AdjustmentsHorizontalIcon,MagnifyingGlassIcon} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import { useNavigation } from "@react-navigation/native";
import FeaturedRow from "../components/FeaturedRow";
import { useState } from "react";
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then(data => {
      setFeaturedCategories(data)
    })
  }, []);

  return (
    
    <SafeAreaView className="bg-white pt-10 ">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
           <MagnifyingGlassIcon color="gray" /> 
          <TextInput placeholder="Restaurants and cuisines" keyboardType="default" /> 
        </View>
         <AdjustmentsHorizontalIcon color="#00CCBB" /> 
      </View>
      <ScrollView className="bg-gray-100 "
       contentContainerStyle={{
        paddingBottom:100,
      }}>
        {/* Categories */}
          <Categories />

          {/* Featured */}
          <FeaturedRow
          id="0"
          title="Featured"
          description="Paid placements from our partners"
          />
          {/* Tasty Discounts */}
          <FeaturedRow
          id="1"
          title="Tasty Discounts"
          description="Everyone's been enjoying juicy discounts!"
          />
          {/* Offers Near You */}
          <FeaturedRow
          id="2"
          title="Offers near you!"
          description="Why not support your local restaurant tonight!"
          />


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;