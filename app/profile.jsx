import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import IconButton from "@/components/IconButton";
import TextButtonPrimary from "@/components/TextButtonPrimary";
import TextButtonSecondary from "@/components/TextButtonSecondary";
import CheckboxComponent from "@/components/CheckboxComponent";
import { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const { initialFirstName, initialEmail } = useLocalSearchParams();

  const [firstName, onChangeFirstName] = useState(initialFirstName || "");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState(initialEmail || "");
  const [number, onChangeNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [image, setImage] = useState(null);

  // Run validation when input fields change
  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, number]);

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!number) {
      newErrors.number = "Phone number is required.";
    }

    // Update state only if errors have changed
    setErrors((prevErrors) => {
      if (JSON.stringify(prevErrors) !== JSON.stringify(newErrors)) {
        return newErrors;
      }
      return prevErrors;
    });

    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton iconName="arrow-left" onPress={() => router.back()} />
        <Image
          style={{ height: 40 }}
          source={require("@/assets/images/logo.png")}
        />
        <Image
          style={{ width: 50, height: 50 }}
          source={
            image ? { uri: image.uri } : require("@/assets/images/profile.png")
          }
        />
      </View>
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.heading}>Personal information</Text>
        <Text
          style={{
            color: Colors.secondary.gray300,
            fontWeight: "800",
            fontSize: 16,
            fontFamily: "Karla-Regular",
            paddingBottom: 5,
          }}
        >
          Avatar
        </Text>
        <View style={styles.avatarContainer}>
          <Image
            style={{ width: 100, height: 100 }}
            source={
              image
                ? { uri: image.uri }
                : require("@/assets/images/profile.png")
            }
          />
          <TextButtonPrimary text="Change" onPress={pickImage} />
          <TextButtonSecondary
            text="Remove"
            borderRadius={0}
            onPress={() => setImage(null)}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeFirstName}
              value={firstName}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeLastName}
              value={lastName}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeEmail}
              value={email}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Phone Number</Text>
            <MaskedTextInput
              mask="9999 999 999"
              style={styles.textInput}
              onChangeText={(text, rawText) => onChangeNumber(rawText)}
              value={number}
            />
            {errors.number && (
              <Text style={styles.errorText}>{errors.number}</Text>
            )}
          </View>
          <View>
            <Text style={styles.heading}>Email notifications</Text>
            <CheckboxComponent text="Order Statuses" />
            <CheckboxComponent text="Password Changes" />
            <CheckboxComponent text="Special Offers" />
            <CheckboxComponent text="Newsletter" />
          </View>
          <TextButtonPrimary
            text="Log out"
            backgroundColor={Colors.primary.yellow}
            color="#000"
          />
          <View style={styles.footer}>
            <TextButtonSecondary text="Discard Changes" onPress={() => {}} />
            <TextButtonPrimary text="Save Changes" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    width: "95%",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.secondary.gray100,
    borderRadius: 10,
  },
  heading: {
    color: Colors.primary.green,
    fontWeight: "800",
    fontSize: 22,
    fontFamily: "Karla-Regular",
    paddingVertical: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    gap: 15,
    paddingVertical: 20,
  },
  textInputContainer: {
    width: "100%",
    gap: 5,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: Colors.secondary.gray700,
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Karla-Regular",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 15,
  },
});
