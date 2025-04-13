import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {FormInput} from "./layout/form-input";
import {Routes} from "../../routes";

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <View className="pt-16 px-6">
        <PageTitle title={'No worry e dey sup'} description={'Enter your email address to reset your password'}/>

        <View className="flex justify-center mb-8">
          <View className="w-48 h-48 self-center relative">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/184d711f94-8e3990d8a26c984bf7dd.png',
              }}
              className="rounded-full w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="my-6">
          <View className="mb-4">
            <FormInput label={'Email Address'} icon={'envelope'} placeholder={'Enter your email address'}
                       type={'email-address'} size={24} height={'h-16'} value={email} setValue={setEmail}/>
          </View>

          <TouchableOpacity className="w-full bg-purple-600 rounded-full py-4 items-center">
            <Text className="text-white font-semibold">Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 items-center">
          <Text className="text-gray-600 flex-row items-center">
            <Text>Remembered your password?{' '}</Text>
            <Text onPress={() => navigation.navigate(Routes.login)} className="text-purple-600 font-medium">
              Log in
            </Text>
          </Text>
        </View>

        <View className="mt-8 items-center">
          <TouchableOpacity className="flex-row items-center justify-center">
            <FontAwesome5
              name="question-circle"
              size={16}
              color="#7e22ce"
              style={{ marginRight: 4 }}
            />
            <Text className="text-purple-600 font-medium">Need help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
