import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const TenantHomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="absolute top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <View className="flex-row justify-between items-center px-4 py-3">
          <View className="flex-row items-center space-x-2">
            <Image
              source={{ uri: 'data:image/svg+xml;base64,...' }}
              style={{ width: 32, height: 32 }}
            />
            <Text className="text-lg font-bold text-purple-600">Rent Easy 9ja</Text>
          </View>

          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <FontAwesome5 name="bell" size={20} color="#4B5563" />
            </TouchableOpacity>
            <Image
              source={{
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
              }}
              className="w-8 h-8 rounded-full"
            />
          </View>
        </View>

        <View className="px-4 py-3">
          <View className="relative">
            <FontAwesome5
              name="magnifying-glass"
              size={16}
              color="#9CA3AF"
              style={{ position: 'absolute', left: 12, top: 12 }}
            />
            <TextInput
              placeholder="Search locations, properties..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm"
            />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 80 }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Properties */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4">Featured Properties</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {[
              {
                id: 1,
                title: 'Luxury Apartment in Lekki',
                subtitle: '3 bed • 2 bath • Furnished',
                price: '₦450,000/mo',
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/32726e1724-b37f0370ed6f7ff1b2c5.png',
              },
              {
                id: 2,
                title: 'Modern House in Abuja',
                subtitle: '4 bed • 3 bath • Unfurnished',
                price: '₦650,000/mo',
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/ca8187e486-5f6142e6406aaca4449a.png',
              },
            ].map((item) => (
              <View
                key={item.id}
                className="mr-4 w-72 rounded-xl bg-white shadow-sm"
              >
                <View className="relative">
                  <Image
                    source={{ uri: item.uri }}
                    className="w-full h-40 rounded-t-xl"
                    resizeMode="cover"
                  />
                  <Text className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </Text>
                </View>
                <View className="p-4">
                  <Text className="font-bold">{item.title}</Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {item.subtitle}
                  </Text>
                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-purple-600 font-bold">
                      {item.price}
                    </Text>
                    <TouchableOpacity>
                      <FontAwesome5
                        name="heart"
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4">Recommended for You</Text>
          <View className="bg-white rounded-xl shadow-sm mb-4">
            <View className="relative">
              <Image
                source={{
                  uri:
                    'https://storage.googleapis.com/uxpilot-auth.appspot.com/5a4f142203-1812e482100f0dc787d4.png',
                }}
                className="w-full h-48 rounded-t-xl"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm"
              >
                <FontAwesome5
                  name="heart"
                  size={16}
                  color="#7e22ce"
                />
              </TouchableOpacity>
            </View>
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="font-bold">
                    Victoria Island Apartment
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    2 bed • 2 bath • Serviced
                  </Text>
                </View>
                <Text className="text-purple-600 font-bold">
                  ₦350,000/mo
                </Text>
              </View>
              <View className="flex-row items-center text-sm text-gray-600">
                <FontAwesome5
                  name="location-dot"
                  size={14}
                  color="#9CA3AF"
                  style={{ marginRight: 4 }}
                />
                <Text>Victoria Island, Lagos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trending Neighborhoods */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4">
            Trending Neighborhoods
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              {
                id: 1,
                name: 'Lekki',
                count: '234 properties',
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/35127fee53-ff85f93f1567bef1cd47.png',
              },
              {
                id: 2,
                name: 'Ikoyi',
                count: '186 properties',
                uri:
                  'https://storage.googleapis.com/uxpilot-auth.appspot.com/2771978cb9-8c627aee3064d1526521.png',
              },
            ].map((n) => (
              <View
                key={n.id}
                className="w-[48%] mb-4 rounded-xl overflow-hidden"
              >
                <Image
                  source={{ uri: n.uri }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/60 flex items-end p-3">
                  <View>
                    <Text className="text-white font-bold">
                      {n.name}
                    </Text>
                    <Text className="text-white text-sm">
                      {n.count}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <View className="flex-row justify-between items-center">
          {[
            { icon: 'house', label: 'Home', active: true },
            { icon: 'compass', label: 'Explore', active: false },
            { icon: 'heart', label: 'Saved', active: false },
            { icon: 'user', label: 'Profile', active: false },
          ].map((btn, i) => (
            <TouchableOpacity
              key={i}
              className={`flex-1 flex-col items-center ${
                btn.active ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <FontAwesome5
                name={btn.icon}
                size={20}
                color={btn.active ? '#7e22ce' : '#9CA3AF'}
              />
              <Text
                className={`text-xs mt-1 ${
                  btn.active ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
