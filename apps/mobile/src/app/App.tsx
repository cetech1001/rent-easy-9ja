/* eslint-disable jsx-a11y/accessible-emoji */
import "../../global.css"
import {OnboardingScreen} from "../components/onboarding";
import {LoginScreen} from "../components/auth/login";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "../routes";
import {useColorScheme} from "react-native";
import {RegisterScreen} from "../components/auth/register";
import {VerifyEmailScreen} from "../components/auth/verify-email";

const Stack = createNativeStackNavigator();

export const App = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={Routes.onboarding}
                       screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.onboarding}
                      component={OnboardingScreen}/>
        <Stack.Screen name={Routes.login} component={LoginScreen}/>
        <Stack.Screen name={Routes.register} component={RegisterScreen}/>
        <Stack.Screen name={Routes.verifyEmail} component={VerifyEmailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
