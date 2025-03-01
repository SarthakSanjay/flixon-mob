import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Login from "./login";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Slot />
    </ThemedView>
  );
}
