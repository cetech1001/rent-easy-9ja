import React, { useState } from 'react';
import {ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {RoleTab} from "./partials/role-tab";
import {FormInput} from "./partials/form-input";
import {FLOWS, ROUTES} from "../../routes";
import {SSO} from "./partials/sso";
import {FormSwitch} from "./partials/form-switch";
import {useNavigateTo} from "../../hooks/use-navigate";
import {useAuth} from "../../contexts/auth.context";
import {UserRole} from "@rent-easy-9ja/types";

export const RegisterScreen = () => {
  const navigateTo = useNavigateTo();
  const { register, state } = useAuth();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [role, setRole] = useState(UserRole.TENANT);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!fullname.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (!agreeTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await register({
        email: email.trim(),
        fullName: fullname.trim(),
        phone: phone.trim(),
        password,
        role,
      });

      Alert.alert(
        'Registration Successful',
        'Please check your email for verification instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigateTo(ROUTES.verifyEmail, FLOWS.authFlow),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'Unable to create account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <ScrollView className="pt-16 px-6">
        <PageTitle title={'How e dey be?'} description={'Join RentEasy 9ja today'}/>

        <View className="flex-row gap-4 mb-8">
          <RoleTab role={UserRole.TENANT} activeRole={role} setRole={setRole}/>
          <RoleTab role={UserRole.LANDLORD} activeRole={role} setRole={setRole}/>
        </View>

        {state.error && (
          <View className="mb-4 p-3 bg-red-100 rounded-lg">
            <Text className="text-red-600 text-sm">{state.error}</Text>
          </View>
        )}

        <View className="mb-6">
          <View className="my-2">
            <FormInput
              label={'Full Name'}
              icon={'user'}
              placeholder={'Enter your fullname'}
              value={fullname}
              setValue={setFullname}
              type={'default'}
            />
          </View>

          <View className="my-2">
            <FormInput
              label={'Phone Number'}
              icon={'phone'}
              placeholder={'Enter your phone number'}
              value={phone}
              setValue={setPhone}
              type={'phone-pad'}
            />
          </View>

          <View className="my-2">
            <FormInput
              label={'Email Address'}
              icon={'envelope'}
              placeholder={'Enter your email address'}
              type={'email-address'}
              value={email}
              setValue={setEmail}
            />
          </View>

          <View className="my-2">
            <FormInput
              label={'Password'}
              icon={'lock'}
              placeholder={'Enter your password'}
              secureTextEntry={true}
              value={password}
              setValue={setPassword}
            />
          </View>

          <View className="my-2">
            <FormInput
              label={'Confirm Password'}
              icon={'lock'}
              placeholder={'Re-type your password'}
              secureTextEntry={true}
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          </View>

          <FormSwitch value={agreeTerms} setValue={setAgreeTerms} label={
            <>
              I agree to the{' '}
              <Text className="text-purple-600">Terms</Text> and{' '}
              <Text className="text-purple-600">Privacy Policy</Text>
            </>
          }/>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          className={`w-full rounded-full py-4 mb-4 items-center ${
            isLoading ? 'bg-gray-400' : 'bg-purple-600'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Create Account</Text>
          )}
        </TouchableOpacity>

        <View className="my-4">
          <SSO text={'sign up'}/>
        </View>

        <Text className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Text onPress={() => navigateTo(ROUTES.login, FLOWS.authFlow)}
                className="text-purple-600 font-medium">Sign In</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
