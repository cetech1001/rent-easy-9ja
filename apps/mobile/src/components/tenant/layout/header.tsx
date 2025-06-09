import {StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigateTo} from "../../../hooks/use-navigate";
import {FLOWS, ROUTES} from "../../../routes";
import {useCustomNavigation, useFilterState} from "../../../contexts/app-state.context";

interface IProps {
  title: string;
}

export const Header = (props: IProps) => {
  const colorScheme = useColorScheme();
  const navigateTo = useNavigateTo(FLOWS.tenantFlow);
  const { previousPage } = useCustomNavigation();
  const { toggleFilterPage, isFilterPageOpen } = useFilterState();

  return (
    <View className={`absolute left-0 right-0 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'} z-50 shadow-sm`} style={{ top: 50 }}>
      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-bold text-purple-600">{props.title}</Text>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity style={styles.filterButton} onPress={() => {
            if (isFilterPageOpen) {
              navigateTo(previousPage || ROUTES.tenantHome);
            } else {
              navigateTo(ROUTES.tenantSearch);
            }
            toggleFilterPage();
          }}>
            <FontAwesome5 name={isFilterPageOpen ? "times" : "sliders-h"} size={16} color="#6b7280" />
            {/*<View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>3</Text>
            </View>*/}
          </TouchableOpacity>
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
            placeholder="Search locations, property types..."
            className="w-full pl-10 pr-4 py-2 bg-base-100 text-base-content rounded-full text-sm"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    // backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
