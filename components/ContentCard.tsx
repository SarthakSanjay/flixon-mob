import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export default function ContentCard({ poster }: { poster: string }) {
  const router = useRouter();
  const movie = { id: "vnlfnlsfnkl", title: "spiderman" };
  const handleMoviePress = (movie: { id: string; title: string }) => {
    router.push({
      pathname: "/movie_details",
      params: { id: movie.id, title: movie.title },
    });
  };
  return (
    <Pressable onPress={() => handleMoviePress(movie)}>
      <ThemedView style={styles.card}>
        <Image style={styles.poster} source={{ uri: poster }} />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  poster: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
});
