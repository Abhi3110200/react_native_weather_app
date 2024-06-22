import {
  View,
  Text,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,

} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { CalendarDaysIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import{debounce} from 'lodash'

import { SearchBar } from "react-native-screens";
import { fetchLocations } from "../api/weather";
export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const handleLocation = () => {
    console.log("location changed");
  };
  const handleSearch=value=>{
    //fetch locations
    if(value.length>2){
      fetchLocations({cityName: value})
      .then(data=>{
        console.log('got Locations', data);
      })
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch,1200),[])
  return (
    <View className="relative flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
        blurRadius={70}
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4  z-50 relative">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleSearch}
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
                className="text-base pl-6 h-10 pb-1 flex-1 text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>

          {location.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let BorderClass = showBorder
                  ? "border-b-2  border-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "items-center flex-row border-0 p-3 px-4 mb-1" +
                      BorderClass
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">
                      Mumbai, India
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-center font-bold text-white text-2xl">
            Mumbai,
            <Text className="text-lg font-semibold text-gray-300">India</Text>
          </Text>
          
          <View className='flex-row justify-center'>
            <Image source={require('../assets/images/partlycloudy.png')} className='w-52 h-52'/>
          </View>

          <View className='space-y-2'>
            <Text className='text-center text-white font-bold text-6xl ml-5'>23&#176;</Text>
            <Text className='text-center font-bold text-white text-xl tracking-widest'>Partly Cloudy</Text>
          </View>

          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/icons/wind.png')} className='h-6 w-6'/>
              <Text className='text-white font-semibold text-base'>22km</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/icons/drop.png')} className='h-6 w-6'/>
              <Text className='text-white font-semibold text-base'>23%</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('../assets/icons/sun.png')} className='h-6 w-6'/>
              <Text className='text-white font-semibold text-base'>6:05 AM</Text>
            </View>
          </View>
        </View>

        <View className='mb-2 space-y-3'>
          <View className='flex-row space-x-2 items-center mx-5'>
            <CalendarDaysIcon size='22' color='white'/>
            <Text className='text-white text-base'>Daily forecast</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}>
            <View className='flex justify-center w-24 items-center rounded-3xl py-3 mr-4 space-y-1' style={{
              backgroundColor: theme.bgWhite(0.15)
            }}>
              <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11'/>
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View className='flex justify-center w-24 items-center rounded-3xl py-3 mr-4 space-y-1' style={{
              backgroundColor: theme.bgWhite(0.15)
            }}>
              <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11'/>
              <Text className='text-white'>Tuesday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View className='flex justify-center w-24 items-center rounded-3xl py-3 mr-4 space-y-1' style={{
              backgroundColor: theme.bgWhite(0.15)
            }}>
              <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11'/>
              <Text className='text-white'>Wednesday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View className='flex justify-center w-24 items-center rounded-3xl py-3 mr-4 space-y-1' style={{
              backgroundColor: theme.bgWhite(0.15)
            }}>
              <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11'/>
              <Text className='text-white'>Thursday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
