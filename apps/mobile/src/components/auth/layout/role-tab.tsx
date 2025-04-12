import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Text, TouchableOpacity} from "react-native";
import React, {Dispatch, FC, SetStateAction, useCallback} from "react";
import {AccessRole} from "../../../helper";


interface IProps {
  role: AccessRole;
  activeRole: AccessRole;
  setRole: Dispatch<SetStateAction<AccessRole>>;
}

export const RoleTab: FC<IProps> = (props) => {
  const roleClass = useCallback((accessRole: AccessRole) => {
    return props.role === accessRole ? 'border-purple-600 bg-purple-100' : 'border-gray-200 bg-white';
  }, [props.role]);

  const roleTextClass = useCallback((accessRole: AccessRole) => {
    return props.role === accessRole ? 'text-purple-600' : 'text-gray-400';
  }, [props.role]);

  return (
    <TouchableOpacity onPress={() => props.setRole(props.role)}
                      className={`flex-1 py-3 px-4 rounded-2xl border-2 flex-col items-center h-28 justify-center ${roleClass(AccessRole.tenant)}`}>
      <FontAwesome5
        name={props.role === AccessRole.tenant ? "house-user" : "key"}
        size={20}
        color={props.role === props.activeRole ? "#7e22ce" : "#9ca3af"}
        style={{ marginBottom: 4 }}
      />
      <Text className={`text-sm font-semibold ${roleTextClass(AccessRole.tenant)}`} style={{ textTransform: 'capitalize' }}>
        {props.role}
      </Text>
    </TouchableOpacity>
  );
}
