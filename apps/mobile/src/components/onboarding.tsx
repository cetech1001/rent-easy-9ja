import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme
} from 'react-native';
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination, ICarouselInstance } from "react-native-reanimated-carousel";

const window = Dimensions.get("window");
const slides = [
  {
    title: "Find Your Perfect Home",
    description: "Browse through thousands of verified properties across Nigeria",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4fa0326d72-09a8b336c5879c9509a3.png"
  },
  {
    title: "Easy Communication",
    description: "Chat directly with landlords and schedule viewings instantly",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/eae7a67c90-f4e2902f56d12c064807.png"
  },
  {
    title: "Secure Rentals",
    description: "Safe and transparent rental process with verified listings",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/cfa5386cf6-a16330df52c55b9d24d4.png"
  }
];

export const OnboardingScreen = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const colorScheme = useColorScheme();
  const themeName = colorScheme === 'dark' ? 'dark' : '';

  return (
    <SafeAreaView className={`flex-1 ${themeName} bg-background`}>
      <View className="absolute bg-background flex-row justify-between items-center top-20 left-0 right-0 px-4 py-3 z-50">
        <View className="flex-row items-center">
          <Image
            source={{ uri: '#' }}
            className="w-8 h-8"
          />
          <Text className="text-lg font-bold text-purple-600" style={{ fontSize: 18 }}>Rent Easy 9ja</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-gray-500 text-sm">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="pt-16 pb-24">
        <View id="carousel-component">
          <Carousel
            autoPlayInterval={2000}
            autoPlay={true}
            data={slides}
            height={600}
            loop={true}
            pagingEnabled={true}
            snapEnabled={true}
            width={window.width}
            style={{
              width: window.width,
            }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={progress}
            renderItem={({ index, item }) => (
              <View className="px-6 py-8" key={index}>
                <Image source={{ uri: item.image }} className="self-center mb-6" style={styles.slideImage} />
                <Text className="font-bold text-center text-2xl mb-3 text-base-900">{item.title}</Text>
                <Text className="text-center text-base-600" style={{ fontSize: 16 }}>{item.description}</Text>
              </View>
            )}
          />
        </View>

        <Pagination.Basic
          progress={progress}
          data={slides}
          activeDotStyle={{
            backgroundColor: "#4c1d95",
          }}
          dotStyle={{
            backgroundColor: colorScheme === 'dark' ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.2)",
            borderRadius: 50
          }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-background px-6 py-4 shadow-lg">
        <TouchableOpacity className="items-center rounded-full bg-purple-600 py-4 mb-3">
          <Text className="text-white font-semibold" style={{ fontSize: 16 }}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center rounded-full border border-purple-600 text-purple-600 py-4">
          <Text className="font-semibold text-purple-600" style={{ fontSize: 16 }}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slideImage: {
    width: window.width,
    height: 450,
  },
});
