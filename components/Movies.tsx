import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import useGenre from "@/hooks/useGenre";
import ContentSlider from "./ContentSlider";

export default function Movies() {
  const genres = useGenre();
  return (
    <ThemedView style={styles.container}>
      {genres.map((genre, index) => {
        return <ContentSlider key={index} type="movies" genre={genre} />;
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
