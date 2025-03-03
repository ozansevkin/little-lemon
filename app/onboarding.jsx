import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import Colors from "@/constants/Colors";
import { storeData } from "@/utils/storage";
import { Link } from "expo-router";

export default function Onboarding() {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when name or email changes
    validateForm();
  }, [name, email]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
      </View>
      <ScrollView
        style={styles.main}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          gap: 80,
        }}
      >
        <Text style={styles.heading}>Let us get to know you</Text>
        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeName}
              value={name}
            />
            <Text style={styles.errorText}>{errors.name}</Text>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeEmail}
              value={email}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Link
          href={{
            pathname: "/profile",
            params: { initialFirstName: name, initialEmail: email },
          }}
          asChild
        >
          <Pressable
            style={[styles.button, !isFormValid && { opacity: 0.5 }]}
            onPress={onPressNext}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const onPressNext = () => {
  storeData("isOnboardingCompleted", true);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary.gray300,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.secondary.gray200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    backgroundColor: Colors.secondary.gray300,
    width: "100%",
  },
  footer: {
    height: 80,
    width: "100%",
    backgroundColor: Colors.secondary.gray200,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingTop: 10,
  },
  heading: {
    flex: 1,
    color: Colors.secondary.gray700,
    fontSize: 22,
    fontFamily: "Karla-Regular",
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 20,
  },
  logo: {
    width: 277,
    height: 60,
  },
  button: {
    width: 100,
    backgroundColor: Colors.secondary.gray300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: Colors.secondary.gray700,
    fontSize: 20,
    fontFamily: "Karla-Regular",
    fontWeight: "600",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  textInputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: Colors.secondary.gray700,
    borderRadius: 5,
    padding: 10,
  },
  textInputLabel: {
    color: Colors.secondary.gray700,
    fontSize: 20,
    fontFamily: "Karla-Regular",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Karla-Regular",
    fontWeight: "600",
  },
});
