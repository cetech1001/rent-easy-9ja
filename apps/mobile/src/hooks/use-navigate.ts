import {useNavigation} from "@react-navigation/native";
import {useCustomNavigation} from "../contexts/app-state.context";

export const useNavigateTo = (defaultFlow?: string) => {
  const navigation = useNavigation();
  const { setCurrentTab, setPreviousPage, currentTab } = useCustomNavigation();
  return (screen: string, flow?: string) => {
    setPreviousPage(currentTab);
    setCurrentTab(screen);
    if (flow || defaultFlow) {
      // @ts-expect-error don't know why parameter type is never
      return navigation.navigate(flow || defaultFlow, {screen});
    }
    return navigation.navigate(screen as never);
  }
}
