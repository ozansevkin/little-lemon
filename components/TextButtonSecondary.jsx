import { Pressable, Text } from "react-native";
import Colors from "@/constants/Colors";

export default function TextButtonSecondary({
  borderRadius = 8,
  text,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: borderRadius,
        borderColor: Colors.secondary.gray300,
        padding: 8,
      }}
    >
      <Text
        style={{
          color: Colors.secondary.gray300,
          fontWeight: 600,
          fontFamily: "Karla-Regular",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
