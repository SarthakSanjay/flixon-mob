import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import { Image, ScrollView, StyleSheet } from "react-native";
import useContent from "@/hooks/useContent";
import useGenre from "@/hooks/useGenre";

export default function Movies() {
  const genres = useGenre();
  return (
    <ThemedView style={styles.container}>
      {genres.map((genre) => {
        return <ContentSlider genre={genre} />;
      })}
    </ThemedView>
  );
}
function ContentSlider({ genre }: { genre: string }) {
  const content = useContent();
  return (
    <ScrollView horizontal={true}>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "column",
          height: 260,
          width: "100%",
        }}
      >
        <ThemedText style={styles.sliderTitle}>{genre}</ThemedText>
        <ThemedView style={styles.slider}>
          {content.map((poster) => {
            return <ContentCard poster={poster} />;
          })}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

function ContentCard({ poster }: { poster: string }) {
  return (
    <ThemedView style={styles.card}>
      <Image style={styles.poster} source={{ uri: poster }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    borderColor: "green",
  },
  slider: {
    height: 220,
    width: "100%",
    // borderColor: "white",
    // borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 10,
    // overflowX: "hidden",
  },
  sliderTitle: {
    height: 40,
    verticalAlign: "bottom",
    paddingInline: 10,
    fontSize: 20,
  },
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
