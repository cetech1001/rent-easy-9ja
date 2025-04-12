import React, { useState } from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Switch, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";

export const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <View className="pt-16 px-6">
        <PageTitle title={'How e dey be?'} description={'Join RentEasy 9ja today'}/>

        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity className="flex-1 py-3 px-4 rounded-xl bg-purple-100 border-2 border-purple-600 flex-col items-center">
            <FontAwesome5
              name="house-user"
              size={20}
              color="#7e22ce"
              style={{ marginBottom: 4 }}
            />
            <Text className="text-sm font-semibold text-purple-600">Tenant</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 px-4 rounded-xl bg-white border-2 border-gray-200 flex-col items-center">
            <FontAwesome5
              name="key"
              size={20}
              color="#9ca3af"
              style={{ marginBottom: 4 }}
            />
            <Text className="text-sm font-semibold text-gray-400">Landlord</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Form */}
        <View className="space-y-4 mb-6">
          {/* Full Name */}
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Full Name</Text>
            <View className="relative">
              <FontAwesome5
                name="user"
                size={16}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 12, top: 15 }}
              />
              <TextInput
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200"
              />
            </View>
          </View>

          {/* Phone Number */}
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Phone Number</Text>
            <View className="relative">
              <FontAwesome5
                name="phone"
                size={16}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 12, top: 15 }}
              />
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200"
              />
            </View>
          </View>

          {/* Email Address */}
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Email Address</Text>
            <View className="relative">
              <FontAwesome5
                name="envelope"
                size={16}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 12, top: 15 }}
              />
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200"
              />
            </View>
          </View>

          {/* Create Password */}
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Create Password</Text>
            <View className="relative">
              <FontAwesome5
                name="lock"
                size={16}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 12, top: 15 }}
              />
              <TextInput
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: 15 }}
              >
                <FontAwesome5 name="eye" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-700">Confirm Password</Text>
            <View className="relative">
              <FontAwesome5
                name="lock"
                size={16}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 12, top: 15 }}
              />
              <TextInput
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 12, top: 15 }}
              >
                <FontAwesome5 name="eye" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms Agreement */}
          <View className="flex-row items-center">
            <Switch
              value={agreeTerms}
              onValueChange={setAgreeTerms}
              trackColor={{ false: '#E5E7EB', true: '#D1D5DB' }}
              thumbColor={agreeTerms ? '#7e22ce' : '#9CA3AF'}
            />
            <Text className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <Text className="text-purple-600">Terms</Text> and{' '}
              <Text className="text-purple-600">Privacy Policy</Text>
            </Text>
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity className="w-full bg-purple-600 rounded-full py-4 mb-4 items-center">
          <Text className="text-white font-semibold">Create Account</Text>
        </TouchableOpacity>

        {/* Social Auth */}
        <View className="space-y-4">
          <View className="flex-row items-center my-4">
            <View className="flex-1 border-t border-gray-200" />
            <Text className="mx-2 text-sm text-gray-500">or sign up with</Text>
            <View className="flex-1 border-t border-gray-200" />
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg border border-gray-200 space-x-2">
              <FontAwesome5 name="google" size={20} color="#ef4444" />
              <Text className="text-sm font-medium">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg border border-gray-200 space-x-2">
              <FontAwesome5 name="facebook" size={20} color="#2563eb" />
              <Text className="text-sm font-medium">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Prompt */}
        <Text className="text-center mt-8 text-gray-600">
          Already have an account?{' '}
          <Text className="text-purple-600 font-medium">Sign In</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
