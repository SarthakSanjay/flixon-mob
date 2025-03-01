import ContentCard from "@/components/ContentCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import useContent from "@/hooks/useContent";
import { Fontisto } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const content = useContent("movies");
  return (
    <SafeAreaView>
      <SearchBox />
      <ScrollView style={{ paddingInline: 5 }}>
        <ThemedView
          style={{
            height: 40,
            width: "100%",
            // borderColor: "white",
            // borderWidth: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ThemedText style={{ fontSize: 24 }}>Now Trending</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: 10,
            paddingVertical: 10,
          }}
        >
          {content.map((movies, index) => {
            return (
              <ContentCard key={index} isSearched={true} poster={movies} />
            );
          })}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchBox() {
  return (
    <ThemedView style={styles.searchContainer}>
      <ThemedTextInput
        style={styles.input}
        placeholder="search"
        placeholderTextColor={"gray"}
      />
      <Pressable style={styles.searchBtn}>
        <Fontisto size={24} name="search" color={"white"} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: "80%",
    width: "80%",
    borderColor: "gray",
    borderBottomWidth: 1,
    color: "white",
  },
  searchBtn: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
