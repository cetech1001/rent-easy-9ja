import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Text, TouchableOpacity} from "react-native";
import React, {Dispatch, FC, SetStateAction, useMemo} from "react";
import {UserRole} from "@rent-easy-9ja/types";


interface IProps {
  role: UserRole;
  activeRole: UserRole;
  setRole: Dispatch<SetStateAction<UserRole>>;
  size?: 'lg';
}

export const RoleTab: FC<IProps> = (props) => {
  const roleClass = useMemo(() => {
    return props.role === props.activeRole ? 'border-purple-600 bg-purple-100' : 'border-gray-200 bg-white';
  }, [props.activeRole]);

  const roleTextClass = useMemo(() => {
    return props.role === props.activeRole ? 'text-purple-600' : 'text-gray-400';
  }, [props.activeRole]);

  return (
    <TouchableOpacity onPress={() => props.setRole(props.role)}
                      className={`flex-1 py-3 px-4 ${props.size === 'lg' ? 'rounded-2xl h-28' : 'rounded-xl'} border-2 flex-col items-center justify-center ${roleClass}`}>
      <FontAwesome5
        name={props.role === UserRole.TENANT ? "house-user" : "key"}
        size={20}
        color={props.role === props.activeRole ? "#7e22ce" : "#9ca3af"}
        style={{ marginBottom: 4 }}
      />
      <Text className={`text-sm font-semibold ${roleTextClass}`} style={{ textTransform: 'capitalize' }}>
        {props.role}
      </Text>
    </TouchableOpacity>
  );
}
