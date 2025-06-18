import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROUTES} from "../../routes";
import {TenantHomeScreen} from "./home";
import {TenantExploreScreen} from "./explore";
import {Header} from "./layout/header";
import React from "react";
import {SafeAreaView} from "react-native";
import {Footer} from "./layout/footer";
import {TenantSearchScreen} from "./search";
import {TenantPropertyDetailScreen} from "./property-detail";
import {TenantSavedAndRecentScreen} from "./saved-and-recent";

const TenantStack = createNativeStackNavigator();

export const TenantFlow = () => {
  return (
    <SafeAreaView className="flex-1">
      <Header/>
      <TenantStack.Navigator screenOptions={{ headerShown: false }}
                             initialRouteName={ROUTES.tenantHome}>
        <TenantStack.Screen name={ROUTES.tenantHome} component={TenantHomeScreen}/>
        <TenantStack.Screen name={ROUTES.tenantExplore} component={TenantExploreScreen}/>
        <TenantStack.Screen name={ROUTES.tenantSearch} component={TenantSearchScreen}/>
        <TenantStack.Screen name={ROUTES.tenantPropertyDetail} component={TenantPropertyDetailScreen}/>
        <TenantStack.Screen name={ROUTES.tenantSavedAndRecent} component={TenantSavedAndRecentScreen}/>
      </TenantStack.Navigator>
      <Footer/>
    </SafeAreaView>

  );
}
