import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContentDetails() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Thumbnail />
        <ThemedView style={{ flex: 1, paddingInline: 10 }}>
          <Title />
          <Metadata />
          <Pressable style={styles.playBtn}>
            <FontAwesome5 name="play" size={16} />
            <ThemedText
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: 500,
              }}
            >
              Watch Now
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
function Metadata() {
  return (
    <ThemedView style={styles.detailsContainer}>
      <ThemedText style={styles.category}>Blockbuster</ThemedText>
      <ThemedView style={styles.metadataContainer}>
        <ThemedText style={styles.text}>2024</ThemedText>
        <ThemedView style={styles.dot}></ThemedView>
        <ThemedView style={styles.rated}>
          <ThemedText
            style={{
              lineHeight: 14,
              fontSize: 11,
              color: "white",
              fontWeight: 800,
            }}
          >
            G
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.dot}></ThemedView>
        <ThemedText style={styles.text}>1h46m</ThemedText>
        <ThemedView style={styles.dot}></ThemedView>
        <ThemedText style={styles.text}>4 Languages</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function Thumbnail() {
  return (
    <ThemedView style={styles.thumbnailContainer}>
      <Image
        source={{
          uri: "https://tgtrs.wordpress.com/wp-content/uploads/2021/09/unnamed-1.jpg",
        }}
        style={styles.thumbnail}
      />
    </ThemedView>
  );
}

function Title() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/original/s2RhdgMEeMCIO2Wre9OdRsbQGVE.png",
        }}
        style={styles.titleImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnailContainer: {
    height: 240,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
  },
  thumbnail: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    height: 90,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleImage: {
    height: "100%",
    width: 200,
    objectFit: "contain",
  },
  detailsContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  metadataContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  category: {
    color: "#007FFF",
    fontSize: 16,
    fontWeight: 800,
  },
  text: {
    fontSize: 14,
  },
  rated: {
    height: 16,
    backgroundColor: "gray",
    color: "white",
    fontSize: 14,
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingInline: 4,
    marginTop: 4,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: "50%",
    backgroundColor: "gray",
    marginInline: 2,
  },
  playBtn: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    flexDirection: "row",
    gap: 10,
  },
});
