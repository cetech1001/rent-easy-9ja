import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from "./layout/header";
import {PageTitle} from "./layout/page-title";
import {FLOWS, ROUTES} from "../../routes";
import {useNavigateTo} from "../../hooks/use-navigate";

let intervalID: NodeJS.Timer;

export const VerifyEmailScreen = () => {
  const navigateTo = useNavigateTo();

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  let [timer, setTimer] = useState(60000);

  useEffect(() => {
    intervalID = setInterval(() => {
      if (timer > 0) {
        setTimer(prevState => prevState - 1000);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID);
    }
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalID);
    }
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    } else {
      const prevIndex = index - 1;
      if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex]?.focus();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <View className="pt-16 px-6">
        <PageTitle title={'Verify Your Email'} description={`We've sent a verification code to\nexample@email.com`}/>

        <View className="flex justify-center mb-8">
          <View className="w-48 h-48 self-center relative">
            <Image
              source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b383810312-92d2a482015b38e5660e.png' }}
              className="rounded-full w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="space-y-6">
          <View className="flex-row justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleOtpChange("", index);
                  }
                }}
                onChangeText={(text) => handleOtpChange(text, index)}
                className="w-12 h-12 text-center text-2xl font-bold rounded-xl border-2 text-base-600 border-gray-200 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 flex-col justify-center items-center"
              />
            ))}
          </View>

          <TouchableOpacity onPress={() => navigateTo(ROUTES.tenantHome, FLOWS.tenantFlow)}
                            className="w-full bg-purple-600 rounded-full py-4 items-center">
            <Text className="text-white font-semibold">Verify Email</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 items-center">
          <Text className="text-gray-600 mb-2">Didn't receive the code?</Text>
          <View className="flex-row items-center justify-center space-x-1">
            {timer === 0 ? (
              <TouchableOpacity>
                <Text className="text-purple-600">Resend code</Text>
              </TouchableOpacity>
            ) : (
              <Text>
                <Text className="text-gray-500">Resend code in</Text>{' '}
                <Text className="text-purple-600 font-medium">{timer / 1000}s</Text>
              </Text>
            )}
          </View>
        </View>

        <View className="mt-8 items-center">
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome5 name="envelope" size={16} color="#7e22ce" style={{ marginRight: 4 }} />
            <Text className="text-purple-600 font-medium"
                  onPress={() => navigateTo(ROUTES.register, FLOWS.authFlow)}>Change email address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
