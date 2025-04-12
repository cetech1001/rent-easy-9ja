/* eslint-disable jsx-a11y/accessible-emoji */
import "../../global.css"
import {OnboardingScreen} from "../components/onboarding";
import {LoginScreen} from "../components/login";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "../routes";
import {useColorScheme} from "react-native";

const Stack = createNativeStackNavigator();

export const App = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.onboarding} options={{  }}
                      component={OnboardingScreen}/>
        <Stack.Screen name={Routes.login} component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
