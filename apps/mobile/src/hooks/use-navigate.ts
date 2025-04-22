import {useNavigation} from "@react-navigation/native";

export const useNavigateTo = () => {
  const navigation = useNavigation();
  return (screen: string, flow?: string) => {
    if (flow) {
      // @ts-expect-error don't know why parameter type is never
      return navigation.navigate(flow, {screen});
    }
    return navigation.navigate(screen as never);
  }
}
