import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fragment, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentSlider from "./ContentSlider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMovieById } from "@/hooks/useMovie";

interface MovieImage {
  thumbnailUrl: string;
  screenshots: string[];
  poster: string;
}

interface Movie {
  _id: string;
  name: string;
  description: string;
  image: MovieImage;
  genre: string[];
  releasedOn: number;
  duration: number;
  rating: number;
  cast: string[];
  director: string;
  isFeatured: boolean;
  tags: string[];
  availablity: string[]; // Note: "availablity" is misspelled in the original data
  ageRating: string;
  views: number;
  audioLanguages: string[];
  subtitleLanguages: string[];
  addedOn: string;
}

export default function ContentDetails() {
  const params = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { getMovieById, loading, error } = useMovieById({
    id: `${params.id}`,
  });
  console.log(params.id);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById();
      console.log("movie data", data);
      setMovie(data);
    };
    fetchMovie();
  }, []);
  //

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Thumbnail />
        <ThemedView style={{ flex: 1, paddingInline: 10 }}>
          <Title title={movie?.name} />
          <Metadata movie={movie} />
          <WatchBtn />
          <Genre genre={movie?.genre} />
          <Description description={movie?.description} />
          <Controls />
          <ContentSlider type="movies" genre="Similar Movies" />
          <ContentSlider type="movies" genre="You may also like these !" />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

function Controls() {
  return (
    <ThemedView style={styles.controlsContainer}>
      <Pressable style={styles.controlBtn}>
        <FontAwesome5 name="plus" size={14} color={"white"} />
        <ThemedText style={styles.controlBtnText}>My List</ThemedText>
      </Pressable>
      <Pressable style={styles.controlBtn}>
        <FontAwesome5 name="share" size={14} color={"white"} />
        <ThemedText style={styles.controlBtnText}>Share</ThemedText>
      </Pressable>
      <Pressable style={styles.controlBtn}>
        <FontAwesome5 name="heart" size={14} color={"white"} />
        <ThemedText style={styles.controlBtnText}>Like</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

function Description({ description }: { description: string | undefined }) {
  return (
    <ThemedView style={styles.description}>
      <ThemedText style={{ fontSize: 14, color: "gray" }}>
        {description}
      </ThemedText>
    </ThemedView>
  );
}

function Genre({ genre }: { genre: string[] | undefined }) {
  return (
    <ScrollView horizontal={true} style={styles.genreContainer}>
      <ThemedView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          height: "100%",
          width: "100%",
          paddingInline: 4,
        }}
      >
        {genre?.map((gen, index) => {
          return (
            <Fragment key={index}>
              <ThemedText style={{ fontSize: 14 }}>{gen}</ThemedText>
              {index < genre?.length - 1 && (
                <ThemedView
                  style={{
                    height: "50%",
                    width: 2,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                ></ThemedView>
              )}
            </Fragment>
          );
        })}
      </ThemedView>
    </ScrollView>
  );
}

function WatchBtn() {
  return (
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
  );
}
function Metadata({ movie }: { movie: Movie | null }) {
  return (
    <ThemedView style={styles.detailsContainer}>
      <ThemedText style={styles.category}>Blockbuster</ThemedText>
      <ThemedView style={styles.metadataContainer}>
        <ThemedText style={styles.text}>{movie?.releasedOn}</ThemedText>
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
            {movie?.ageRating}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.dot}></ThemedView>
        <ThemedText style={styles.text}>{movie?.duration}</ThemedText>
        <ThemedView style={styles.dot}></ThemedView>
        <ThemedText style={styles.text}>
          {movie?.audioLanguages.length} Languages
        </ThemedText>
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

function Title({ title }: { title: string | undefined }) {
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
    marginVertical: 10,
  },
  genreContainer: {
    height: 30,
    width: "100%",
  },
  description: {
    paddingInline: 5,
    marginVertical: 10,
  },
  controlsContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  controlBtn: {
    backgroundColor: "transparent",
    height: "50%",
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtnText: {
    fontSize: 12,
    color: "gray",
  },
});
