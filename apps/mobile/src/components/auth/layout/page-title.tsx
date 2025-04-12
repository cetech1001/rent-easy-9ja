import {Text, View} from "react-native";
import React, {FC} from "react";

interface IProps {
  title: string;
  description: string;
}

export const PageTitle: FC<IProps> = (props) => {
  return (
    <View className="text-center mb-8">
      <Text className="text-2xl font-bold mb-2 text-base-900 text-center">
        {props.title}
      </Text>
      <Text className="text-base-700 text-center" style={{ fontSize: 16 }}>
        {props.description}
      </Text>
    </View>
  );
}
