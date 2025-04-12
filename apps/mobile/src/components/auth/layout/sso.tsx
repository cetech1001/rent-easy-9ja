import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, {FC} from "react";


interface IProps {
  text: string;
}

export const SSO: FC<IProps> = (props) => {
  return (
    <>
      <View className="flex-row items-center my-4">
        <View className="flex-1 border-t border-gray-200" />
        <Text className="mx-2 text-sm text-base-500">or {props.text} with</Text>
        <View className="flex-1 border-t border-gray-200" />
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-200 space-x-2">
          <FontAwesome5 name="google" size={20} color="#ef4444" />
          <Text className="text-sm font-medium text-base-600">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-200 space-x-2">
          <FontAwesome5 name="facebook" size={20} color="#2563eb" />
          <Text className="text-sm font-medium text-base-600">Facebook</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
