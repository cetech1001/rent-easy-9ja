import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import {FLOWS, ROUTES} from "../../routes";
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {FormInput} from "./partials/form-input";
import {RoleTab} from "./partials/role-tab";
import {FormSwitch} from "./partials/form-switch";
import {SSO} from "./partials/sso";
import {useNavigateTo} from "../../hooks/use-navigate";
import {useAuth} from "../../contexts/auth.context";
import {UserRole} from "@rent-easy-9ja/types";

export const LoginScreen = () => {
  const navigateTo = useNavigateTo();
  const { login, state } = useAuth();

  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState(UserRole.TENANT);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      await login(email.trim(), password);

      // Navigate based on user role
      if (role === UserRole.TENANT) {
        navigateTo(ROUTES.tenantHome, FLOWS.tenantFlow);
      } else {
        // Navigate to landlord flow when implemented
        navigateTo(ROUTES.tenantHome, FLOWS.tenantFlow);
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Unable to login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView className={"flex-1 text-base-content"}>
      <Header/>

      <View className="pt-20 px-6">
        <PageTitle title={'How far!'} description={'Sign in to continue your house hunting journey'}/>

        <View className="flex-row gap-4 mb-8">
          <RoleTab role={UserRole.TENANT} activeRole={role} setRole={setRole} size={'lg'}/>
          <RoleTab role={UserRole.LANDLORD} activeRole={role} setRole={setRole} size={'lg'}/>
        </View>

        {state.error && (
          <View className="mb-4 p-3 bg-red-100 rounded-lg">
            <Text className="text-red-600 text-sm">{state.error}</Text>
          </View>
        )}

        <View className="mb-6">
          <View className="mt-4">
            <FormInput
              label={'Email Address'}
              icon={'envelope'}
              placeholder={'Enter your email address'}
              type={'email-address'}
              size={24}
              height={'h-16'}
              value={email}
              setValue={setEmail}
            />
          </View>

          <View className="mt-4">
            <FormInput
              label={'Password'}
              icon={'lock'}
              placeholder={'Enter your password'}
              secureTextEntry={true}
              size={24}
              height={'h-16'}
              value={password}
              setValue={setPassword}
            />
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <FormSwitch value={remember} setValue={setRemember} label={'Remember me'}/>
            <TouchableOpacity onPress={() => navigateTo(ROUTES.forgotPassword, FLOWS.authFlow)}>
              <Text className="text-sm text-purple-600 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading || !email || !password}
          className={`w-full rounded-full py-4 mb-4 items-center ${
            isLoading || !email || !password
              ? 'bg-gray-400'
              : 'bg-purple-600'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4">
          <SSO text={'continue'}/>
        </View>

        <Text className="text-center mt-8 text-base-600">
          Don't have an account?{' '}
          <Text onPress={() => navigateTo(ROUTES.register, FLOWS.authFlow)}
                className="text-purple-600 font-medium">Sign Up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
