import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { ThemedView } from "./ThemedView";
import { useRef } from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";
import useContent from "@/hooks/useContent";

const width = Dimensions.get("window").width;

export default function ContentCarousel({ type }: { type: string }) {
  const ref = useRef<ICarouselInstance>(null);
  const content = useContent(type);
  const progress = useSharedValue<number>(1);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <ThemedView
      style={{
        height: 600,
      }}
    >
      <Carousel
        ref={ref}
        width={width}
        data={content}
        onProgressChange={progress}
        renderItem={({ index, item }) => (
          <ThemedView style={styles.heroImage}>
            <ThemedView
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            >
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  objectFit: "cover",
                }}
                source={{
                  uri: item,
                }}
                blurRadius={50}
              />
            </ThemedView>

            <Image
              style={{
                height: 400,
                width: "100%",
                borderRadius: 10,
                objectFit: "contain",
              }}
              source={{
                uri: item,
              }}
            />
            <ThemedView
              style={{
                height: 40,
                width: "100%",
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <ThemedView
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "transparent",
                }}
              >
                <FontAwesome5 size={25} name="imdb" color="white" />
                <ThemedText
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  9.1
                </ThemedText>
              </ThemedView>
              <ThemedView
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "transparent",
                }}
              >
                <Ionicons size={25} name="film" color="white" />
                <ThemedText
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Action
                </ThemedText>
              </ThemedView>
            </ThemedView>
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
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={content}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{
          gap: 5,
          marginTop: 10,
          position: "absolute",
          bottom: 10,
        }}
        onPress={onPressPagination}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heroInnerContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  playBtn: {
    backgroundColor: "white",
    height: 40,
    width: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  myListBtn: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 40,
    width: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});
