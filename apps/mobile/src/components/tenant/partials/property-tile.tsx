import {Image, Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Property} from "@rent-easy-9ja/types";

interface IProps {
  property: Property;
}

export const PropertyTile = (props: IProps) => {
  return (
    <View className="mr-4 w-72 rounded-xl bg-white shadow-sm">
      <View className="relative">
        <Image
          source={{ uri: props.property.uri }}
          className="w-full h-40 rounded-t-xl"
          resizeMode="cover"
        />
        <Text className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
          Featured
        </Text>
      </View>
      <View className="p-4">
        <Text className="font-bold">{props.property.title}</Text>
        <Text className="text-gray-600 text-sm mt-1">
          {props.property.subtitle}
        </Text>
        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-purple-600 font-bold">
            {props.property.price}
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
  );
}
