import { Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";

export default function IconButton({ iconName, onPress }) {
  return (
    <Pressable
      style={{
        backgroundColor: Colors.primary.green,
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <FontAwesome6 name={iconName} color="white" size={20} />;
    </Pressable>
  );
}
