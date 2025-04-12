import {Switch, Text, View} from "react-native";
import React, {Dispatch, FC, SetStateAction} from "react";

interface IProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  label: string;
}

export const FormSwitch: FC<IProps> = (props) => {
  return (
    <View className="flex-row items-center">
      <Switch
        value={props.value}
        onValueChange={props.setValue}
        trackColor={{ false: '#E5E7EB', true: '#D1D5DB' }}
        thumbColor={props.value ? '#7e22ce' : '#9CA3AF'}
      />
      <Text className="ml-2 text-sm text-base-600">{props.label}</Text>
    </View>
  )
}
