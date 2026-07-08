import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { imageToBase64 } from "../lib/gemini";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const router = useRouter();
  const [converting, setConverting] = useState(false);

  async function handleAnalyze() {
    setConverting(true);
    try {
      const base64Image = await imageToBase64(photoUri);
      router.push({
        pathname: "/result",
        params: { base64Image },
      });
    } catch (err) {
      console.log("Error converting image:", err);
    } finally {
      setConverting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.preview} />
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={handleAnalyze}
          disabled={converting}
        >
          {converting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analyze</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1, resizeMode: "contain" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  retakeButton: { backgroundColor: "#5A6472", padding: 14, borderRadius: 8 },
  analyzeButton: {
    backgroundColor: "#5B3FA3",
    padding: 14,
    borderRadius: 8,
    minWidth: 90,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
