import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Amenities} from "@rent-easy-9ja/types";
import {globalStyles} from "../../styles/global";

export const TenantSearchScreen = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [amenities, setAmenities] = useState<Amenities>({
    furnished: false,
    ac: false,
    security: false,
    parking: false,
  });

  const toggleAmenity = (key: string) => {
    // @ts-expect-error idk
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView
      contentContainerStyle={globalStyles.mainContainer}
      className="px-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-2xl text-base-content font-bold mb-2">Find Your Next Home</Text>
        <Text className="text-gray-600">Search properties across Nigeria</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row space-x-2 mb-6"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-full bg-purple-600 text-white">
          <FontAwesome5 name="map-marker" size={16} color="#FFF" style={{ marginRight: 8 }} />
          <Text className="text-white">Popular Locations</Text>
        </TouchableOpacity>
        {['Lagos', 'Abuja', 'Port Harcourt'].map((city) => (
          <TouchableOpacity
            key={city}
            className="px-4 py-2 rounded-full bg-white border border-gray-200"
          >
            <Text className="text-gray-700">{city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="rounded-2xl p-4 mb-6">
        <View className="mb-6">
          <Text className="font-semibold mb-4 text-base-content">Price Range (₦)</Text>
          <View className="flex-row space-x-4 justify-between">
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
              className="w-[48%] px-4 py-2 rounded-lg border border-gray-200"
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
              className="w-[48%] px-4 py-2 rounded-lg border border-gray-200"
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="font-semibold mb-4 text-base-content">Property Type</Text>
          <View className="flex-row flex-wrap justify-between text-base-content">
            {[
              { icon: 'building', label: 'Apartment' },
              { icon: 'home', label: 'House' },
              { icon: 'hotel', label: 'Studio' },
              { icon: 'warehouse', label: 'Duplex' },
            ].map((type) => (
              <TouchableOpacity
                key={type.label}
                className="w-[48%] px-4 py-3 rounded-lg border border-gray-200 mb-3 flex-row items-center"
              >
                <FontAwesome5
                  name={type.icon}
                  size={16}
                  color="#7e22ce"
                  style={{ marginRight: 8 }}
                />
                <Text className={"text-base-content"}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text className="font-semibold mb-4 text-base-content">Amenities</Text>
          <View className="flex-row flex-wrap justify-between text-base-content">
            {[
              { key: 'furnished', label: 'Furnished' },
              { key: 'ac', label: 'Air Conditioning' },
              { key: 'security', label: 'Security' },
              { key: 'parking', label: 'Parking' },
            ].map((am) => (
              <View
                key={am.key}
                className="w-[48%] flex-row items-center mb-3 text-base-content"
              >
                <Switch
                  // @ts-expect-error idk
                  value={amenities[am.key]}
                  onValueChange={() => toggleAmenity(am.key)}
                  trackColor={{ false: '#E5E7EB', true: '#D1D5DB' }}
                  // @ts-expect-error idk
                  thumbColor={amenities[am.key] ? '#7e22ce' : '#9CA3AF'}
                />
                <Text className="ml-2 text-base-content">{am.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 border-t px-6 py-4">
        <TouchableOpacity className="w-full bg-purple-600 rounded-full py-4 items-center">
          <Text className="text-white font-semibold">Show Results</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
