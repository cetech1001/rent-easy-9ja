import {KeyboardType, Text, TextInput, TouchableOpacity, useColorScheme, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, {Dispatch, FC, SetStateAction, useState} from "react";

interface IProps {
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<any>>;
  type?: KeyboardType;
  size?: number;
  secureTextEntry?: boolean;
  height?: string;
}

export const FormInput: FC<IProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const colorScheme = useColorScheme();

  return (
    <>
      <Text className={`text-sm font-medium ${isSelected ? 'text-purple-600' : 'text-base-600'}`}>
        {props.label}
      </Text>
      <View className="flex-row items-center">
        <FontAwesome5
          name={props.icon}
          size={props.size || 16}
          color={isSelected ? "#7e22ce" : "#9ca3af"}
          style={{ position: 'absolute', left: 12, zIndex: 100 }}
        />
        <TextInput onFocus={() => setIsSelected(true)} onBlur={() => setIsSelected(false)}
                   keyboardType={props.type} secureTextEntry={props.secureTextEntry && !showContent} value={props.value}
                   className={`w-full pl-10 pr-4 py-3 ${props.height || 'h-11'} rounded-lg border text-base-900 ${colorScheme === 'light' && 'bg-white'} ${isSelected ? 'border-purple-600' : 'border-gray-200'}`}
                   placeholder={props.placeholder} onChangeText={props.setValue}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowContent(!showContent)}
            style={{ position: 'absolute', right: 12 }}
          >
            <FontAwesome5 name={showContent ? 'eye-slash' : 'eye'} size={16} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
