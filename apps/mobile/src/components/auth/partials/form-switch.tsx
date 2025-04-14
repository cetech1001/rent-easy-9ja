import {Switch, Text, View} from "react-native";
import React, {Dispatch, FC, ReactNode, SetStateAction} from "react";

interface IProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  label: string | ReactNode;
}

export const FormSwitch: FC<IProps> = (props) => {
  return (
    <View className="flex-row items-center">
      <Switch
        value={props.value}
        onValueChange={props.setValue}
        trackColor={{ false: '#FFFFFF', true: '#FFFFFF' }}
        thumbColor={props.value ? '#7e22ce' : '#9CA3AF'}
      />
      <Text className="ml-2 text-sm text-base-600">{props.label}</Text>
    </View>
  )
}
