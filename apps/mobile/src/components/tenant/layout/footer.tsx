import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";


const navOptions = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'compass', label: 'Explore', active: false },
  { icon: 'heart', label: 'Saved', active: false },
  { icon: 'user', label: 'Profile', active: false },
]

export const Footer = () => {
  const colorScheme = useColorScheme();

  return (
    <View className={`absolute bottom-0 left-0 right-0 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'} border-t border-base-200 px-6 py-3`}>
      <View className="flex-row justify-between items-center">
        {navOptions.map((option, i) => (
          <TouchableOpacity
            key={i}
            className={`flex-1 flex-col items-center ${
              option.active ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <FontAwesome5
              name={option.icon}
              size={20}
              color={option.active ? '#7e22ce' : '#9CA3AF'}
            />
            <Text
              className={`text-xs mt-1 ${
                option.active ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
