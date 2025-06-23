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
import {AppStateProvider} from "../contexts/app-state.context";
import {AuthProvider} from "../contexts/auth.context";

const RootStack = createNativeStackNavigator();

export const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppStateProvider>
          <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootStack.Navigator initialRouteName={ROUTES.onboarding}
                                 screenOptions={{ headerShown: false }}>
              <RootStack.Screen name={ROUTES.onboarding} component={OnboardingScreen}/>
              <RootStack.Screen name={FLOWS.authFlow} component={AuthFlow}/>
              <RootStack.Screen name={FLOWS.tenantFlow} component={TenantFlow}/>
            </RootStack.Navigator>
          </NavigationContainer>
        </AppStateProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};
