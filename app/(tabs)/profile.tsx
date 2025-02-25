import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Profile {
  username: string;
  avatarImage: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [onAdd, setOnAdd] = useState<boolean>(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {!onAdd ? <Profiles setOnAdd={setOnAdd} /> : <AddProfile />}
    </SafeAreaView>
  );
}

function AddProfile() {
  const [isFocused, setIsFocused] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.addProfileContiner}>
        <ThemedText style={{ position: "absolute", top: 20 }}>
          Add New Profile
        </ThemedText>
        <ThemedView style={styles.addAvatarBtn}></ThemedView>
        <ThemedView style={styles.usernameContainer}>
          <ThemedText style={{ marginInline: 4 }}>Enter Username</ThemedText>
          <ThemedTextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="pikachu"
            value={username}
            onChangeText={(text) => {
              if (username === "") {
                setIsFocused(false);
              }
              setIsFocused(true);
              setUsername(text);
            }}
            placeholderTextColor={"gray"}
            onFocus={() => setIsFocused(true)}
          />
        </ThemedView>
        <Pressable style={styles.saveProfileBtn}>
          <ThemedText style={{ fontSize: 20 }}>Save</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

function Profiles({ setOnAdd }: { setOnAdd: (v: boolean) => void }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.heading}>
        <ThemedText>Who is watching?</ThemedText>
        <Pressable style={styles.editBtn}>
          <ThemedText>Edit</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.innerContainer}>
        <ThemedView style={styles.profileAvatar}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
            }}
          />
          <ThemedText>Chameleon</ThemedText>
        </ThemedView>

        <AddProfileBtn setOnAdd={setOnAdd} />
      </ThemedView>
    </ThemedView>
  );
}

function AddProfileBtn({ setOnAdd }: { setOnAdd: (v: boolean) => void }) {
  return (
    <Pressable
      style={styles.addProfileBtn}
      onPress={() => {
        setOnAdd(true);
      }}
    >
      <Ionicons name="add" size={50} color={"white"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "white",
  },
  heading: {
    height: 50,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    // alignItems: "center",
    alignContent: "center",
    // borderWidth: 1,
    // borderColor: "white",
    flexDirection: "row",
    gap: 10,
    paddingInline: 50,
  },
  profileAvatar: {
    height: 120,
    width: 100,
    borderRadius: 10,
    // borderColor: "pink",
    // borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  profileName: {
    height: 20,
  },
  avatarImage: {
    height: 100,
    width: "100%",
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 10,
  },
  addProfileBtn: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addProfileContiner: {
    flex: 1,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  addAvatarBtn: {
    height: 100,
    width: 100,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "white",
    marginInline: "auto",
  },
  usernameContainer: {
    height: 100,
    width: "100%",
    // borderColor: "white",
    // borderWidth: 1,
    paddingInline: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  input: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    color: "white",
  },
  inputFocused: {
    borderColor: "white",
  },
  saveProfileBtn: {
    height: 40,
    width: 150,
    borderRadius: 10,
    backgroundColor: "#22A7F0",
    color: "whuite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
