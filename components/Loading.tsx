import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";
import { ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </ThemedView>
    </SafeAreaView>
  );
}
