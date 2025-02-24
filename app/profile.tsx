import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.heading}>
        <ThemedText>Who is watching?</ThemedText>
        <Pressable style={styles.editBtn}>
          <ThemedText>Edit</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    height: 20,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
  },
});
