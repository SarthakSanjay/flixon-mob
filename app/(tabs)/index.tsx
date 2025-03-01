import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Movies from "@/components/Movies";
import Series from "@/components/Series";
import ContentCarousel from "@/components/ContentCarousel";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSwipeEnabled, userState } from "@/atoms/atom";
import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Tab = createMaterialTopTabNavigator();

function AuthCheck() {
  const [user, setUser] = useRecoilState(userState);
  const segments = useSegments();
  const router = useRouter();

  console.log("user", user);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("auth checking");
      const isAuthenticated = user !== null;
      const inAuthGroup = segments[0] === "(auth)";

      if (
        (!isAuthenticated && !inAuthGroup) ||
        (isAuthenticated && inAuthGroup)
      ) {
        if (!isAuthenticated) {
          console.log("not authenticated");
          router.push("/(auth)/login");
        } else {
          console.log("authenticated");
          router.push("/(tabs)");
        }
      }
    };

    checkAuth();
  }, [user, segments]);

  return null;
}

function MoviesScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ContentCarousel type="movies" />
      <Movies />
    </ScrollView>
  );
}

function SeriesScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ContentCarousel type="series" />
      <Series />
    </ScrollView>
  );
}

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  // const swipeState = useRecoilValue(isSwipeEnabled);

  useEffect(() => {
    const logToken = async () => {
      const at = await SecureStore.getItemAsync("access_token");
      const rt = await SecureStore.getItemAsync("refresh_token");

      console.log("at", at);
      console.log("rt", rt);
    };
    logToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthCheck />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[theme].tint,
          tabBarStyle: {
            backgroundColor: "rgba(0,0,0,0.6)",
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
          swipeEnabled: false,
          tabBarIndicatorStyle: {
            height: 4,
            backgroundColor: "#C30101",
            borderRadius: 5,
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
