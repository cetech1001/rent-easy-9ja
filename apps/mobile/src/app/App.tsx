/* eslint-disable jsx-a11y/accessible-emoji */
import "../../global.css"
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useColorScheme} from "react-native";
import {FLOWS, ROUTES} from "../routes";
import {OnboardingScreen} from "../components/onboarding/onboarding";
import {AuthFlow} from "../components/auth/auth";
import {TenantFlow} from "../components/tenant/tenant";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const RootStack = createNativeStackNavigator();

export const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator initialRouteName={ROUTES.onboarding}
                             screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={ROUTES.onboarding} component={OnboardingScreen}/>
          <RootStack.Screen name={FLOWS.authFlow} component={AuthFlow}/>
          <RootStack.Screen name={FLOWS.tenantFlow} component={TenantFlow}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
