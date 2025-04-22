import {Animated, Image, Text, TouchableOpacity, View, PanResponder} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Property} from "@rent-easy-9ja/types";
import React, {useRef, useEffect, useState} from "react";

interface IProps {
  properties: Property[];
}

export const GesturePropertyTile = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (props.properties.length === 0 || currentIndex >= props.properties.length) {
    return null;
  }
  const current = props.properties[currentIndex];

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx < -120) {
          Animated.timing(pan, {toValue: {x: -500, y: 0}, duration: 200, useNativeDriver: false}).start(() => {
            pan.setValue({x: 0, y: 0});
            setCurrentIndex(i => i + 1);
          });
        } else {
          Animated.spring(pan, {toValue: {x: 0, y: 0}, useNativeDriver: false}).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pan, {toValue: {x: -15, y: 0}, duration: 200, useNativeDriver: false}),
      Animated.timing(pan, {toValue: {x: 0, y: 0}, duration: 200, useNativeDriver: false}),
    ]).start();
  }, []);

  if (currentIndex >= props.properties.length) {
    return <Text className={"text-base-content"}>Reload the app to get new recommendations</Text>
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      className={"rounded-xl bg-white mb-4"}
      style={[{transform: pan.getTranslateTransform()}]}
    >
      <View className="relative">
        <Image
          source={{ uri: current.uri }}
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
              {current.title}
            </Text>
            <Text className="text-gray-600 text-sm mt-1">
              {current.subtitle}
            </Text>
          </View>
          <Text className="text-purple-600 font-bold">
            {current.price}
          </Text>
        </View>
        <View className="flex-row items-center text-sm text-gray-600">
          <FontAwesome5
            name="map-pin"
            size={14}
            color="#9CA3AF"
            style={{ marginRight: 4 }}
          />
          <Text>Victoria Island, Lagos</Text>
        </View>
      </View>
    </Animated.View>
  );
}
