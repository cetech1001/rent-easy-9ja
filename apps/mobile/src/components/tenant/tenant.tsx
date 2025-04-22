import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROUTES} from "../../routes";
import {TenantHomeScreen} from "./home";

const TenantStack = createNativeStackNavigator();

export const TenantFlow = () => {
  return (
    <TenantStack.Navigator screenOptions={{ headerShown: false }}
                           initialRouteName={ROUTES.tenantHome}>
      <TenantStack.Screen name={ROUTES.tenantHome} component={TenantHomeScreen}/>
    </TenantStack.Navigator>
  );
}
