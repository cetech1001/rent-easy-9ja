import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Switch, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Routes} from "../routes";

enum AccessRole {
  tenant = 'tenant',
  landlord = 'landlord'
}

export const LoginScreen = ({ navigation }: any) => {
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState(AccessRole.tenant);

  const roleClass = useCallback((accessRole: AccessRole) => {
    return role === accessRole ? 'border-purple-600 bg-purple-100' : 'border-gray-200 bg-white';
  }, [role]);

  const roleTextClass = useCallback((accessRole: AccessRole) => {
    return role === accessRole ? 'text-purple-600' : 'text-gray-400';
  }, [role]);

  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPasswordSelected, setIsPasswordSelected] = useState(false);

  return (
    <SafeAreaView className={"flex-1 text-base-content"}>
      <View className="absolute left-0 right-0 flex-row justify-between items-center px-4 py-3 bg-background z-50 border-b" style={{ top: 60 }}>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={() => navigation.navigate(Routes.onboarding)}>
            <FontAwesome5 name="arrow-left" size={20} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-purple-600">Rent Easy 9ja</Text>
        </View>
      </View>

      <View className="pt-20 px-6">
        <View className="text-center mb-8">
          <Text className="text-2xl font-bold mb-2 text-base-900 text-center">How far!</Text>
          <Text className="text-base-700 text-center" style={{ fontSize: 16 }}>
            Sign in to continue your house hunting journey
          </Text>
        </View>

        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity onPress={() => setRole(AccessRole.tenant)}
            className={`flex-1 py-3 px-4 rounded-2xl border-2 flex-col items-center h-28 justify-center ${roleClass(AccessRole.tenant)}`}>
            <FontAwesome5
              name="house-user"
              size={20}
              color={role === AccessRole.tenant ? "#7e22ce" : "#9ca3af"}
              style={{ marginBottom: 4 }}
            />
            <Text className={`text-sm font-semibold ${roleTextClass(AccessRole.tenant)}`}>Tenant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole(AccessRole.landlord)}
            className={`flex-1 py-3 px-4 rounded-2xl border-2 flex-col h-28 items-center justify-center ${roleClass(AccessRole.landlord)}`}>
            <FontAwesome5
              name="key"
              size={20}
              color={role === AccessRole.landlord ? "#7e22ce" : "#9ca3af"}
              style={{ marginBottom: 4 }}
            />
            <Text className={`text-sm font-semibold ${roleTextClass(AccessRole.landlord)}`}>Landlord</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <View className="mt-4">
            <Text className={`text-sm font-medium ${isEmailSelected ? 'text-purple-600' : 'text-base-600'}`}>
              Email Address
            </Text>
            <View className="flex-row items-center">
              <FontAwesome5
                name="envelope"
                size={24}
                color={isEmailSelected ? "#7e22ce" : "#9ca3af"}
                style={{ position: 'absolute', left: 12 }}
              />
              <TextInput onFocus={() => setIsEmailSelected(true)} onBlur={() => setIsEmailSelected(false)}
                keyboardType="email-address"
                className={`w-full pl-10 pr-4 py-3 h-16 rounded-lg border text-base-900 ${isEmailSelected ? 'border-purple-600' : 'border-gray-200'}`}
                placeholder="Enter your email"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className={`text-sm font-medium ${isPasswordSelected ? 'text-purple-600' : 'text-base-600'}`}>
              Password
            </Text>
            <View className="flex-row items-center">
              <FontAwesome5
                name="lock"
                size={24}
                color={isPasswordSelected ? "#7e22ce" : "#9ca3af"}
                style={{ position: 'absolute', left: 12 }}
              />
              <TextInput
                secureTextEntry={!showPassword} onFocus={() => setIsPasswordSelected(true)}
                onBlur={() => setIsPasswordSelected(false)}
                className={`w-full pl-10 pr-12 py-3 h-16 rounded-lg border text-base-900 ${isPasswordSelected ? 'border-purple-600' : 'border-gray-200'}`}
                placeholder="Enter your password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12 }}
              >
                <FontAwesome5 name={showPassword ? 'eye-slash' : 'eye'} size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center">
              <Switch
                value={remember}
                onValueChange={setRemember}
                trackColor={{ false: '#E5E7EB', true: '#D1D5DB' }}
                thumbColor={remember ? '#7e22ce' : '#9CA3AF'}
              />
              <Text className="ml-2 text-sm text-base-600">Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-sm text-purple-600 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="w-full bg-purple-600 rounded-full py-4 mb-4 items-center">
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>

        <View className="space-y-4">
          <View className="flex-row items-center my-4">
            <View className="flex-1 border-t border-gray-200" />
            <Text className="mx-2 text-sm text-base-500">or continue with</Text>
            <View className="flex-1 border-t border-gray-200" />
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-200 space-x-2">
              <FontAwesome5 name="google" size={20} color="#ef4444" />
              <Text className="text-sm font-medium text-base-600">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-200 space-x-2">
              <FontAwesome5 name="facebook" size={20} color="#2563eb" />
              <Text className="text-sm font-medium text-base-600">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-center mt-8 text-base-600">
          Don't have an account?{' '}
          <Text className="text-purple-600 font-medium">Sign Up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
