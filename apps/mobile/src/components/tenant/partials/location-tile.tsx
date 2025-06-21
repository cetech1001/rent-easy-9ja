import {Image, Text, View} from "react-native";

interface IProps {
  locationTile: {
    id: number;
    uri: string;
    name: string;
    count: number;
  }
}

export const LocationTile = (props: IProps) => {
  return (
    <View
      key={props.locationTile.id}
      className="w-[48%] mb-4 rounded-xl overflow-hidden"
    >
      <Image
        source={{ uri: props.locationTile.uri }}
        className="w-full h-32"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-black/60 flex items-end p-3">
        <View>
          <Text className="text-white font-bold">
            {props.locationTile.name}
          </Text>
          <Text className="text-white text-sm">
            {props.locationTile.count} properties
          </Text>
        </View>
      </View>
    </View>
  );
}
