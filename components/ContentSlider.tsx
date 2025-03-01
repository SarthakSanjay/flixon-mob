import useContent from "@/hooks/useContent";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import ContentCard from "./ContentCard";

export default function ContentSlider({
  genre,
  type,
}: {
  genre: string;
  type: string;
}) {
  const content = useContent(type);
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
            {content.map((poster, index) => {
              return (
                <ContentCard isSearched={null} key={index} poster={poster} />
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
