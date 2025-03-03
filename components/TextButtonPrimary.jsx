import { Pressable, Text } from "react-native";
import Colors from "@/constants/Colors";

export default function TextButtonPrimary({
  text,
  backgroundColor = Colors.primary.green,
  color = "#fff",
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: color,
          fontWeight: 600,
          fontFamily: "Karla-Regular",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
