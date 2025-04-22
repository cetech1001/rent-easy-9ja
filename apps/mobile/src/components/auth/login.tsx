import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {FLOWS, ROUTES} from "../../routes";
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {FormInput} from "./partials/form-input";
import {AccessRole} from "../../helper";
import {RoleTab} from "./partials/role-tab";
import {FormSwitch} from "./partials/form-switch";
import {SSO} from "./partials/sso";
import {useNavigateTo} from "../../hooks/use-navigate";


export const LoginScreen = () => {
  const navigateTo = useNavigateTo();

  const [remember, setRemember] = useState(false);

  const [role, setRole] = useState(AccessRole.tenant);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className={"flex-1"}>
      <Header/>

      <View className="pt-20 px-6">
        <PageTitle title={'How far!'} description={'Sign in to continue your house hunting journey'}/>

        <View className="flex-row gap-4 mb-8">
          <RoleTab role={AccessRole.tenant} activeRole={role} setRole={setRole} size={'lg'}/>
          <RoleTab role={AccessRole.landlord} activeRole={role} setRole={setRole} size={'lg'}/>
        </View>

        <View className="mb-6">
          <View className="mt-4">
            <FormInput label={'Email Address'} icon={'envelope'} placeholder={'Enter your email address'}
                       type={'email-address'} size={24} height={'h-16'} value={email} setValue={setEmail}/>
          </View>

          <View className="mt-4">
            <FormInput label={'Password'} icon={'lock'} placeholder={'Enter your password'}
                       secureTextEntry={true} size={24} height={'h-16'} value={password} setValue={setPassword}/>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <FormSwitch value={remember} setValue={setRemember} label={'Remember me'}/>
            <TouchableOpacity onPress={() => navigateTo(ROUTES.forgotPassword, FLOWS.authFlow)}>
              <Text className="text-sm text-purple-600 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigateTo(ROUTES.tenantHome, FLOWS.tenantFlow)}
                          className="w-full bg-purple-600 rounded-full py-4 mb-4 items-center">
          <Text className="text-white font-semibold">Sign In</Text>
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
