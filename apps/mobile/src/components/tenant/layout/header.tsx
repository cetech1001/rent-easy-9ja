import {Image, Text, TextInput, TouchableOpacity, useColorScheme, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Header = () => {
  const colorScheme = useColorScheme();

  return (
    <View className={`absolute left-0 right-0 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'} z-50 shadow-sm`} style={{ top: 50 }}>
      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: '#' }}
            style={{ width: 32, height: 32 }}
          />
          <Text className="text-lg font-bold text-purple-600">Rent Easy 9ja</Text>
        </View>

        <View className="flex-row items-center gap-4">
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
            name="search"
            size={16}
            color={colorScheme === 'dark' ? "#7e22ce" : "#9ca3af"}
            style={{ position: 'absolute', left: 12, top: 12 }}
          />
          <TextInput
            placeholder="Search locations, properties..."
            className="w-full pl-10 pr-4 py-2 bg-base-100 text-base-content rounded-full text-sm"
          />
        </View>
      </View>
    </View>
  );
}
