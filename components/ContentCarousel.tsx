import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { ThemedView } from "./ThemedView";
import { useRef } from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";

const width = Dimensions.get("window").width;

export default function ContentCarousel() {
  const ref = useRef<ICarouselInstance>(null);
  const carouselImage : string[]  = []
  const progress = useSharedValue<number>(0);
  return (
    <ThemedView>
      <Carousel 
      ref={ref}
      width={width}
      data={carouselImage}
      onProgressChange={progress}
      renderItem={
        ({index}) => (
          <ThemedView  style={styles.heroImage}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
            }}
            source={{
              uri: "https://rukminim2.flixcart.com/image/850/1000/poster/6/p/4/posterskart-batman-movie-poster-pkbm25-medium-original-imaebcuqgzpgmmwh.jpeg?q=90&crop=false",
            }}
          />
          <ThemedView style={styles.heroInnerContainer}>
            <Pressable style={styles.playBtn}>
              <ThemedText style={{ color: "black" }}>Play</ThemedText>
            </Pressable>
            <Pressable style={styles.myListBtn}>
              <FontAwesome size={24} color={"white"} name="plus" />
              <ThemedText>My List</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
        )
      }
    />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    height: "100%",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(127, 0, 255,0.2)",
  },
  heroInnerContainer:{

  },
  playBtn:{

  },
  myListBtn:{
  }
})
