import {Animated, Image, Text, TouchableOpacity, View, PanResponder} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Property} from "@rent-easy-9ja/types";
import React, {useRef, useEffect, useState} from "react";

interface IProps {
  properties: Property[];
}

export const GesturePropertyTile = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isAnimating,
      onMoveShouldSetPanResponder: () => !isAnimating,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-expect-error idk
          x: pan.x._value,
          // @ts-expect-error idk
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, {dx: pan.x, dy: pan.y}],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();

        if (gesture.dx < -120) {
          setIsAnimating(true);
          Animated.timing(pan, {
            toValue: {x: -500, y: 0},
            duration: 200,
            useNativeDriver: false
          }).start(() => {
            pan.setValue({x: 0, y: 0});
            setCurrentIndex(i => i + 1);
            setIsAnimating(false);
          });
        } else if (gesture.dx > 120) {
          setIsAnimating(true);
          Animated.timing(pan, {
            toValue: {x: 500, y: 0},
            duration: 200,
            useNativeDriver: false
          }).start(() => {
            pan.setValue({x: 0, y: 0});
            setCurrentIndex(i => i + 1);
            setIsAnimating(false);
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
            tension: 100,
            friction: 8
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    const hintAnimation = Animated.sequence([
      Animated.timing(pan, {
        toValue: {x: -15, y: 0},
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(pan, {
        toValue: {x: 0, y: 0},
        duration: 200,
        useNativeDriver: false
      }),
    ]);

    hintAnimation.start();

    return () => {
      hintAnimation.stop();
    };
  }, [currentIndex]);

  const onRefresh = () => {
    setCurrentIndex(0);
  }

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const opacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  if (props.properties.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-base-content text-center mb-4">
          No properties available
        </Text>
        <TouchableOpacity
          onPress={onRefresh}
          className="bg-purple-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentIndex >= props.properties.length) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-base-content text-center mb-4">
          No more properties to show
        </Text>
        <TouchableOpacity
          onPress={onRefresh}
          className="bg-purple-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Get New Recommendations</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const current = props.properties[currentIndex];

  return (
    <Animated.View
      {...panResponder.panHandlers}
      className="rounded-xl bg-white mb-4"
      style={[
        {
          transform: [
            ...pan.getTranslateTransform(),
            {rotate: rotate}
          ],
          opacity: opacity
        }
      ]}
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
          <Text>{current.location}</Text>
        </View>
      </View>
    </Animated.View>
  );
}
