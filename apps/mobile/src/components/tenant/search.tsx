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
import {useNavigateTo} from "../../hooks/use-navigate";
import {FLOWS, ROUTES} from "../../routes";

export const TenantSearchScreen = () => {
  const navigateTo = useNavigateTo(FLOWS.tenantFlow);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [amenities, setAmenities] = useState<Amenities>({
    furnished: false,
    ac: false,
    security: false,
    parking: false,
  });
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);

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
        {['Lagos', 'Abuja', 'Port Harcourt'].map((city) => {
          const isSelected = selectedLocation === city;
          return (
            <TouchableOpacity
              key={city}
              onPress={() => setSelectedLocation(city)}
              className={`px-4 py-2 rounded-full flex-row items-center ${
                isSelected ? 'bg-purple-600 border-transparent' : 'bg-white border border-gray-200'
              }`}
            >
              {isSelected && (
                <TouchableOpacity onPress={() => setSelectedLocation("")}>
                  <FontAwesome5
                    name={'times'}
                    size={12}
                    color={isSelected ? '#FFF' : '#7e22ce'}
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              )}
              <Text className={`${isSelected ? 'text-white' : 'text-gray-700'}`}>{city}</Text>
            </TouchableOpacity>
          );
        })}
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
            ].map((type) => {
              const isSelected = selectedPropertyTypes.includes(type.label);
              return (
                <TouchableOpacity
                  key={type.label}
                  onPress={() => setSelectedPropertyTypes(prevState => ([
                    ...prevState,
                    type.label
                  ]))}
                  className={`w-[48%] px-4 py-3 rounded-lg mb-3 flex-row items-center justify-between ${
                    isSelected ? 'bg-purple-600 border-transparent' : 'border border-gray-200'
                  }`}
                >
                  <View className={"flex-row items-center"}>
                    <FontAwesome5
                      name={type.icon}
                      size={16}
                      color={isSelected ? '#FFF' : '#7e22ce'}
                      style={{ marginRight: 8 }}
                    />
                    <Text className={isSelected ? 'text-white' : 'text-base-content'}>{type.label}</Text>
                  </View>
                  {isSelected && (
                    <TouchableOpacity onPress={() => setSelectedPropertyTypes(prevState => ([
                      ...prevState.filter(v => v !== type.label)
                    ]))}>
                      <FontAwesome5
                        name={'times'}
                        size={12}
                        color={isSelected ? '#FFF' : '#7e22ce'}
                        style={{ marginRight: 8 }}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              );
            })}
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
        <TouchableOpacity
          onPress={() => navigateTo(ROUTES.tenantExplore)}
          className="w-full bg-purple-600 rounded-full py-4 items-center">
          <Text className="text-white font-semibold">Show Results</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
