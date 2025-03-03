import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "./Loading";

export default function Signin() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
    await login(email, password);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText>Sign In</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor={"gray"}
            textContentType="emailAddress"
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor={"gray"}
            textContentType="password"
            onChangeText={(text: string) => {
              setPassword(text);
            }}
          />
        </ThemedView>

        <Pressable style={styles.playBtn} onPress={handleSignin}>
          <ThemedText
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: 500,
            }}
          >
            Login
          </ThemedText>
        </Pressable>

        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <ThemedText>Don't have Account?</ThemedText>
          <Pressable onPress={() => router.replace("/(auth)/register")}>
            <ThemedText style={{ color: "#0D92F4" }}>Sign Up</ThemedText>
          </Pressable>
        </ThemedView>

        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    paddingInline: 20,
  },
  inputContainer: {
    height: 70,
    width: "100%",
  },
  label: {
    height: 20,
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    color: "white",
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
});
