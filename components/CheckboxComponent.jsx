import Checkbox from "expo-checkbox";
import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";

export default function CheckboxComponent({ text }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={Colors.primary.green}
      />
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
