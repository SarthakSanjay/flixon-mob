import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import ContentCard from "./ContentCard";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { useMovie } from "@/hooks/useMovie";

export default function ContentSlider({
  genre,
  type,
}: {
  genre: string;
  type: string;
}) {
  const { getMoviesByGenre, loading, error } = useMovie();
  const [movies, setMovies] = useState<Movie[] | null>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMoviesByGenre(genre, 10);
      setMovies(data);
    };
    fetchMovie();
  }, []);

  if (movies === null) {
    return "";
  }
  return (
    <>
      <ThemedText style={styles.sliderTitle}>{genre}</ThemedText>
      <ScrollView horizontal={true}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "column",
            height: 220,
            width: "100%",
          }}
        >
          <ThemedView style={styles.slider}>
            {movies?.map((movie: Movie, index) => {
              if (loading) {
                return <ActivityIndicator size={"small"} />;
              }
              return (
                <ContentCard
                  isSearched={null}
                  key={index}
                  poster={movie.image.poster}
                  movieId={movie._id}
                  movieTitle={movie.name}
                />
              );
            })}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    borderColor: "green",
  },
  slider: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 10,
  },
  sliderTitle: {
    height: 40,
    verticalAlign: "bottom",
    paddingInline: 10,
    fontSize: 20,
  },
});
