import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Movies from "@/components/Movies";
import Series from "@/components/Series";
import ContentCarousel from "@/components/ContentCarousel";
import { useRouter, useSegments } from "expo-router";
import { useAuthCheck } from "@/hooks/useAuth";
import Loading from "@/components/Loading";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    checkAuth();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const { isAuthenticated, checkAuth, loading, error } = useAuthCheck();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        if (!isAuthenticated) {
          console.log("Not authenticated, redirecting...");
          router.replace("/(auth)/login");
        } else {
          console.log("Authenticated, redirecting...");
          router.replace("/(tabs)");
        }
      }
    }, 3000);
  }, [isAuthenticated, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              backgroundColor: "black",
              borderRadius: 5,
            },
          }}
        >
          <Tab.Screen name="Movies" component={MoviesScreen} />
          <Tab.Screen name="Series" component={SeriesScreen} />
        </Tab.Navigator>
      </ScrollView>
    </SafeAreaView>
  );
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
