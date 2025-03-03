import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { getData } from "../utils/storage";
import * as SplashScreen from "expo-splash-screen";
import { Redirect } from "expo-router";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const checkOnboardingStatus = async () => {
    const data = await getData("isOnboardingCompleted");
    setIsOnboardingCompleted(data);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (!isOnboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
}
