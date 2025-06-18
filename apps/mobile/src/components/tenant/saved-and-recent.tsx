import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useHeaderState} from "../../contexts/app-state.context";
import {globalStyles} from "../../styles/global";

export const TenantSavedAndRecentScreen = () => {
  const { setHeader } = useHeaderState();

  useEffect(() => {
    setHeader('Saved Properties & Recent Searches');
  }, []);

  const savedProperties = [
    {
      id: 1,
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/32726e1724-9b03c3bad312bae7e4f4.png',
      title: '3 Bedroom Flat in Lekki Phase 1',
      location: 'Lekki, Lagos',
      price: '₦450,000/year',
      beds: 3,
      baths: 2,
      area: '120m²',
    },
    {
      id: 2,
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/db74476f70-a9b82d38f50a5e7c1ca3.png',
      title: '2 Bedroom Apartment in Wuse',
      location: 'Wuse, Abuja',
      price: '₦380,000/year',
      beds: 2,
      baths: 2,
      area: '85m²',
    },
  ];

  const recentSearches = [
    {
      id: 1,
      label: 'Lekki Phase 1',
      details: '2-3 beds, ₦300k-500k',
    },
    {
      id: 2,
      label: 'Ikeja GRA',
      details: '1-2 beds, ₦200k-350k',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={globalStyles.mainContainer}
      className="px-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4">Saved Properties</Text>
        {savedProperties.map((p) => (
          <View
            key={p.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
          >
            <View className="relative">
              <Image
                source={{ uri: p.image }}
                className="w-full h-48"
                resizeMode="cover"
              />
              <TouchableOpacity className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                <FontAwesome5 name="heart" size={16} color="#7c3aed" />
              </TouchableOpacity>
              <View className="absolute bottom-3 left-3 bg-purple-600 px-3 py-1 rounded-full">
                <Text className="text-white text-sm">{p.price}</Text>
              </View>
            </View>
            <View className="p-4">
              <Text className="font-semibold mb-2">{p.title}</Text>
              <View className="flex-row items-center mb-3">
                <FontAwesome5
                  name="location-dot"
                  size={14}
                  color="#6b7280"
                  className="mr-1"
                />
                <Text className="text-gray-600 text-sm">{p.location}</Text>
              </View>
              <View className="flex-row justify-between text-gray-600 text-sm">
                <View className="flex-row items-center">
                  <FontAwesome5 name="bed" size={14} color="#6b7280" />
                  <Text className="ml-1">{p.beds} Beds</Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome5 name="bath" size={14} color="#6b7280" />
                  <Text className="ml-1">{p.baths} Baths</Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome5 name="vector-square" size={14} color="#6b7280" />
                  <Text className="ml-1">{p.area}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4">Recent Searches</Text>
        {recentSearches.map((s) => (
          <View
            key={s.id}
            className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3"
          >
            <View className="flex-row items-center space-x-3 gap-2">
              <View className="bg-purple-100 p-2 rounded-full">
                <FontAwesome6
                  name="clock-rotate-left"
                  size={16}
                  color="#7c3aed"
                />
              </View>
              <View>
                <Text className="font-medium">{s.label}</Text>
                <Text className="text-gray-500 text-sm">{s.details}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome6
                name="arrow-right"
                size={16}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
