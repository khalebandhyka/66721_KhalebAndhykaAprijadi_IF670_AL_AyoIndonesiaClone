import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

export default function SplashScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("LoginPage");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logoAyoIndo.jpeg")} style={styles.logo} />
      <Text style={styles.title}>AYO INDONESIA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#a0041c",
    fontWeight: "bold",
    fontFamily: "Poppins_Bold",
  },
});
