import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import useGenre from "@/hooks/useGenre";
import ContentSlider from "./ContentSlider";

export default function Series() {
  const genres = useGenre();
  return (
    <ThemedView style={styles.container}>
      {genres.map((genre, index) => {
        return <ContentSlider key={index} type="series" genre={genre} />;
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
