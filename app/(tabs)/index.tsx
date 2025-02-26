import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, Pressable, StyleSheet, useColorScheme } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Movies from "@/components/Movies";
import Series from "@/components/Series";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function MoviesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedView style={styles.heroImage}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
            }}
            source={{
              uri: "https://rukminim2.flixcart.com/image/850/1000/poster/6/p/4/posterskart-batman-movie-poster-pkbm25-medium-original-imaebcuqgzpgmmwh.jpeg?q=90&crop=false",
            }}
          />
          <ThemedView style={styles.heroInnerContainer}>
            <Pressable style={styles.playBtn}>
              <ThemedText style={{ color: "black" }}>Play</ThemedText>
            </Pressable>
            <Pressable style={styles.myListBtn}>
              <FontAwesome size={24} color={"white"} name="plus" />
              <ThemedText>My List</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      }
    >
      <Movies />
    </ParallaxScrollView>
  );
}

function SeriesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<ThemedView style={styles.heroImage}></ThemedView>}
    >
      <Series />
    </ParallaxScrollView>
  );
}

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[theme].tint,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "white",
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Series" component={SeriesScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    height: "100%",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(127, 0, 255,0.2)",
  },
  heroInnerContainer: {
    height: 100,
    width: "100%",
    // borderColor: "green",
    // borderWidth: 1,
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  playBtn: {
    backgroundColor: "white",
    height: 40,
    width: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  myListBtn: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 40,
    width: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});
