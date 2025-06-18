import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, {useState} from "react";
import {useNavigateTo} from "../../../hooks/use-navigate";
import {FLOWS, ROUTES} from "../../../routes";


export const Footer = () => {
  const colorScheme = useColorScheme();
  const navigateTo = useNavigateTo(FLOWS.tenantFlow);

  const [navOptions, setNavOptions] = useState([
    { icon: 'home', label: 'Home', route: ROUTES.tenantHome, active: true },
    { icon: 'compass', label: 'Explore', route: ROUTES.tenantExplore, active: false },
    { icon: 'heart', label: 'Saved', route: ROUTES.tenantSavedAndRecent, active: false },
    { icon: 'user', label: 'Profile', route: ROUTES.tenantExplore, active: false },
  ]);

  const changeRoute = (label: string) => {
    setNavOptions(prevState => {
      return prevState.map(option => {
        if (label === option.label) {
          return {
            ...option,
            active: true,
          };
        }
        return { ...option, active: false };
      });
    });
  }

  return (
    <View className={`absolute bottom-0 left-0 right-0 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'} border-t border-base-200 px-6 py-3`}>
      <View className="flex-row justify-between items-center">
        {navOptions.map((option, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              changeRoute(option.label);
              navigateTo(option.route);
            }}
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
