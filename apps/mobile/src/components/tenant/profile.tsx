import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalStyles} from "../../styles/global";
import {useHeaderState} from "../../contexts/app-state.context";

export const TenantProfileScreen = () => {
  const { setHeader } = useHeaderState();

  useEffect(() => {
    setHeader('Profile');
  }, []);

  const favoriteListings = [
    {
      id: 1,
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/7cb5e2bc22-7e3c77f39bc328ba62a4.png',
      title: 'Lekki Phase 1 Apartment',
      price: '₦450,000/year',
    },
    {
      id: 2,
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/17e4e6bda4-34151d172dd28347e51c.png',
      title: 'Maitama Villa',
      price: '₦850,000/year',
    },
  ];

  const applicationHistory = [
    {
      id: 1,
      status: 'Approved',
      date: 'March 15, 2025',
      icon: 'check',
      iconBg: 'bg-green-100',
      iconColor: '#10b981',
    },
    {
      id: 2,
      status: 'Pending',
      date: 'March 20, 2025',
      icon: 'clock',
      iconBg: 'bg-yellow-100',
      iconColor: '#f59e0b',
    },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.mainContainer}
                showsVerticalScrollIndicator={false}
                className="px-4">
      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <View className="flex-row items-center mb-4">
          <Image
            source={{
              uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
            }}
            className="w-20 h-20 rounded-full border-4 border-purple-100"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold text-gray-800">Sarah Johnson</Text>
            <Text className="text-gray-500">sarah.j@email.com</Text>
            <View className="mt-1 inline-flex bg-purple-100 px-3 py-1 rounded-full">
              <Text className="text-purple-600 text-sm">Verified User</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="w-full border border-purple-600 rounded-full py-2.5 items-center">
          <Text className="text-purple-600 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mb-6">
        {[
          { label: 'Favorites', value: '12' },
          { label: 'Applications', value: '5' },
          { label: 'Viewings', value: '3' },
        ].map((stat) => (
          <View key={stat.label} className="flex-1 bg-white p-4 rounded-xl shadow-sm items-center mx-1">
            <Text className="text-2xl font-bold text-purple-600">{stat.value}</Text>
            <Text className="text-gray-500 text-sm">{stat.label}</Text>
          </View>
        ))}
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">Favorite Listings</Text>
        {favoriteListings.map((item) => (
          <View key={item.id} className="flex-row items-center mb-4">
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-gray-500 text-sm">{item.price}</Text>
            </View>
            <FontAwesome5 name="heart" size={20} color="#ef4444" solid />
          </View>
        ))}
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">Application History</Text>
        {applicationHistory.map((app) => (
          <View key={app.id} className="flex-row items-center mb-4">
            <View className={`${app.iconBg} w-12 h-12 rounded-full flex items-center justify-center`}>
              <FontAwesome5 name={app.icon} size={16} color={app.iconColor} solid />
            </View>
            <View className="ml-3">
              <Text className="font-semibold text-gray-800">
                {app.status} • {app.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
