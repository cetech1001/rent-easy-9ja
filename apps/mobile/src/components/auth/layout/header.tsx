import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {Routes} from "../../../routes";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const Header = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const bg = colorScheme === 'dark' ? 'bg-black' : 'bg-white';

  return (
    <View className={`absolute left-0 right-0 flex-row justify-between items-center px-4 py-3 bg-background z-50 border-b ${bg}`} style={{ top: 60 }}>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={() => navigation.navigate(Routes.onboarding as never)}>
          <FontAwesome5 name="arrow-left" size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-purple-600">Rent Easy 9ja</Text>
      </View>
    </View>
  );
}
