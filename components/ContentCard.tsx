import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export default function ContentCard({
  poster,
  isSearched,
}: {
  poster: string;
  isSearched: boolean | null;
}) {
  const router = useRouter();
  const movie = { id: "60c72b2f9e1d3b76f8d32f8a", title: "titanic" };
  const handleMoviePress = (movie: { id: string; title: string }) => {
    router.push({
      pathname: "/movie_details",
      params: { id: movie.id, title: movie.title },
    });
  };
  return (
    <Pressable onPress={() => handleMoviePress(movie)}>
      <ThemedView
        style={[
          styles.card,
          {
            height: isSearched ? 190 : 200,
            width: isSearched ? 120 : 130,
          },
        ]}
      >
        <Image style={styles.poster} source={{ uri: poster }} />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
