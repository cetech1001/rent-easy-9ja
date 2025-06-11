import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity, useColorScheme
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalStyles} from "../../styles/global";

export const TenantPropertyDetailScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      contentContainerStyle={globalStyles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View className="relative w-full h-72">
        <Image
          source={{
            uri:
              'https://storage.googleapis.com/uxpilot-auth.appspot.com/c01cba6b6f-bc3fb4ad2d81644072a7.png',
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View
          className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full"
        >
          <Text className="text-white text-sm">1/8 Photos</Text>
        </View>
      </View>

      <View className="px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl text-base-content font-bold mb-2">
            3 Bedroom Luxury Apartment
          </Text>
          <Text className={`${colorScheme === 'dark' ? "text-base-600" : "text-gray-600"} mb-3`}>
            Lekki Phase 1, Lagos
          </Text>
          <View className="flex-row items-center space-x-4">
            <Text className="text-2xl font-bold text-purple-600">
              ₦2,500,000
            </Text>
            <Text className={colorScheme === 'dark' ? "text-base-500" : "text-gray-500"}>/year</Text>
          </View>
        </View>

        <View className="border-t border-base-500 border-b py-4 mb-6">
          <View className="flex-row justify-between">
            {[
              { icon: 'bed', label: '3 Beds' },
              { icon: 'bath', label: '3 Baths' },
              { icon: 'car', label: '2 Parking' },
              { icon: 'ruler-combined', label: '180 sqm' },
            ].map((f) => (
              <View key={f.label} className="items-center">
                <FontAwesome5
                  name={f.icon}
                  size={16}
                  color="#4b5563"
                  className="mb-2"
                />
                <Text className="text-sm text-base-500">{f.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View className="mb-6">
          <Text className="text-lg text-base-content font-bold mb-4">Amenities</Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { icon: 'wifi', label: 'Free WiFi' },
              { icon: 'fan', label: 'Air Conditioning' },
              { icon: 'shield-alt', label: '24/7 Security' },
              { icon: 'dumbbell', label: 'Gym Access' },
            ].map((a) => (
              <View
                key={a.label}
                className="w-[48%] flex-row items-center mb-4"
              >
                <FontAwesome5
                  name={a.icon}
                  size={20}
                  color="#7e22ce"
                  className="mr-2 w-[15%]"
                />
                <Text className={` w-[85%] ${colorScheme === 'dark' ? "text-base-700" : "text-gray-700"}`}>
                  {a.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Landlord Info */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-base-content mb-4">Landlord</Text>
          <View className="flex-row items-center gap-2 space-x-4">
            <Image
              source={{
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
              }}
              className="w-12 h-12 rounded-full"
            />
            <View>
              <Text className="font-semibold text-base-content">Mr. Oluwaseun Adebayo</Text>
              <Text className={`${colorScheme === 'dark' ? "text-base-600" : "text-gray-600"} text-sm`}>
                Verified Landlord
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-base-content mb-4">Description</Text>
          <Text className={`${colorScheme === 'dark' ? "text-base-600" : "text-gray-600"} leading-relaxed`}>
            Luxurious 3 bedroom apartment in the heart of Lekki Phase 1.
            Features modern finishes, spacious rooms, and top-notch
            amenities. The property comes with 24/7 security, constant power
            supply, and treated water. Perfect for young professionals or
            small families.
          </Text>
        </View>
      </View>

      <View className="absolute bottom-10 left-0 right-0 flex-row px-4 gap-4 py-3 shadow-lg space-x-3">
        <TouchableOpacity className="flex-1 border flex-row justify-center border-purple-600 rounded-full py-3 items-center">
          <FontAwesome5
            name="phone-alt"
            size={16}
            color="#7e22ce"
            style={{ marginRight: 8 }}
          />
          <Text className="text-purple-600 font-semibold">Call</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row justify-center bg-purple-600 rounded-full py-3 items-center">
          <FontAwesome5
            name="comment-alt"
            size={16}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-semibold">Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
