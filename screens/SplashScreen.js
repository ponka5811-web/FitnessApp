import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000); // 2 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // put your logo here
        style={styles.logo}
      />

      <Text style={styles.title}>Fitness Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    color: '#E8FF47'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
});