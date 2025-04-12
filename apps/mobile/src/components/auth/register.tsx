import React, { useState } from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Switch, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {AccessRole} from "../../helper";
import {RoleTab} from "./layout/role-tab";
import {FormInput} from "./layout/form-input";
import {Routes} from "../../routes";
import {SSO} from "./layout/sso";
import {FormSwitch} from "./layout/form-switch";

export const RegisterScreen = ({ navigation }: any) => {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [role, setRole] = useState(AccessRole.tenant);

  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <ScrollView className="pt-16 px-6">
        <PageTitle title={'How e dey be?'} description={'Join RentEasy 9ja today'}/>

        <View className="flex-row gap-4 mb-8">
          <RoleTab role={AccessRole.tenant} activeRole={role} setRole={setRole}/>
          <RoleTab role={AccessRole.landlord} activeRole={role} setRole={setRole}/>
        </View>

        <View className="mb-6">
          <View className="my-2">
            <FormInput label={'Full Name'} icon={'user'} placeholder={'Enter your fullname'}
                       value={fullname} setValue={setFullname} type={'default'}/>
          </View>

          <View className="my-2">
            <FormInput label={'Phone Number'} icon={'phone'} placeholder={'Enter your phone number'}
                       value={phone} setValue={setPhone} type={'phone-pad'}/>
          </View>

          <View className="my-2">
            <FormInput label={'Email Address'} icon={'envelope'} placeholder={'Enter your email address'}
                       type={'email-address'} value={email} setValue={setEmail}/>
          </View>

          <View className="my-2">
            <FormInput label={'Password'} icon={'lock'} placeholder={'Enter your password'}
                       secureTextEntry={true} value={password} setValue={setPassword}/>
          </View>

          <View className="my-2">
            <FormInput label={'Confirm Password'} icon={'lock'} placeholder={'Re-type your password'}
                       secureTextEntry={true} value={confirmPassword} setValue={setConfirmPassword}/>
          </View>

          <FormSwitch value={agreeTerms} setValue={setAgreeTerms} label={
            <>
              I agree to the{' '}
              <Text className="text-purple-600">Terms</Text> and{' '}
              <Text className="text-purple-600">Privacy Policy</Text>
            </>
          }/>
        </View>

        <TouchableOpacity className="w-full bg-purple-600 rounded-full py-4 mb-4 items-center">
          <Text className="text-white font-semibold">Create Account</Text>
        </TouchableOpacity>

        <View className="my-4">
          <SSO text={'sign up'}/>
        </View>

        <Text className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate(Routes.login)}
                className="text-purple-600 font-medium">Sign In</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
