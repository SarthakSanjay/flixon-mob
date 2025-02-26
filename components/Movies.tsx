import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";

export default function Movies() {
  return (
    <ThemedView style={{ flex: 1, backgroundColor: "gray" }}>
      <ThemedText>Hekko</ThemedText>
    </ThemedView>
  );
}
