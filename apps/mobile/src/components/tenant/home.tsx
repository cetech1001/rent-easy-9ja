import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {Header} from "./layout/header";
import {PropertyTile} from "./partials/property-tile";
import {Property} from "@rent-easy-9ja/types";
import {LocationTile} from "./partials/location-tile";
import {Footer} from "./layout/footer";
import {GesturePropertyTile} from "./partials/gesture-property-tile";

const featuredProperties: Property[] = [
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
];

const recommendedProperties: Property[] = [
  {
    id: 1,
    title: 'Victoria Island Apartment',
    subtitle: '2 bed • 2 bath • Serviced',
    price: '₦350,000/mo',
    uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5a4f142203-1812e482100f0dc787d4.png',
  },
  {
    id: 2,
    title: 'Ikoyi Apartment',
    subtitle: '3 bed • 2 bath • Serviced',
    price: '₦550,000/mo',
    uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5a4f142203-1812e482100f0dc787d4.png',
  },
  {
    id: 3,
    title: 'Lekki Apartment',
    subtitle: '1 bed • 1 bath • Serviced',
    price: '₦315,000/mo',
    uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5a4f142203-1812e482100f0dc787d4.png',
  }
];

const trendingLocations = [
  {
    id: 1,
    name: 'Lekki',
    count: 234,
    uri:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/35127fee53-ff85f93f1567bef1cd47.png',
  },
  {
    id: 2,
    name: 'Ikoyi',
    count: 186,
    uri:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/2771978cb9-8c627aee3064d1526521.png',
  },
]

export const TenantHomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1">
      <Header/>

      <ScrollView
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 80 }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-xl text-base-content font-bold mb-4">
            Featured Properties
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {featuredProperties.map((item) => (
              <PropertyTile property={item} key={item.id}/>
            ))}
          </ScrollView>
        </View>

        <View className="mb-8">
          <Text className="text-xl text-base-content font-bold mb-4">
            Recommended for You
          </Text>
          <GesturePropertyTile properties={recommendedProperties}/>
        </View>

        <View>
          <Text className="text-xl text-base-content font-bold mb-4">
            Trending Neighborhoods
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {trendingLocations.map((tile) => (
              <LocationTile locationTile={tile} key={tile.id}/>
            ))}
          </View>
        </View>
      </ScrollView>

      <Footer/>
    </SafeAreaView>
  );
};
