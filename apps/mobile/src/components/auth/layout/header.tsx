import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View className={"absolute left-0 right-0 flex-row justify-between items-center px-4 py-3 bg-background z-50"} style={{ top: 50 }}>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={navigation.goBack}>
          <FontAwesome5 name="arrow-left" size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-purple-600">Rent Easy 9ja</Text>
      </View>
    </View>
  );
}
