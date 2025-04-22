import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROUTES} from "../../routes";
import {LoginScreen} from "./login";
import {RegisterScreen} from "./register";
import {VerifyEmailScreen} from "./verify-email";
import {ForgotPasswordScreen} from "./forgot-password";
import {ResetPasswordScreen} from "./reset-password";

const AuthStack = createNativeStackNavigator();

export const AuthFlow = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}
                         initialRouteName={ROUTES.login}>
      <AuthStack.Screen name={ROUTES.login} component={LoginScreen}/>
      <AuthStack.Screen name={ROUTES.register} component={RegisterScreen}/>
      <AuthStack.Screen name={ROUTES.verifyEmail} component={VerifyEmailScreen}/>
      <AuthStack.Screen name={ROUTES.forgotPassword} component={ForgotPasswordScreen}/>
      <AuthStack.Screen name={ROUTES.resetPassword} component={ResetPasswordScreen}/>
    </AuthStack.Navigator>
  );
}
