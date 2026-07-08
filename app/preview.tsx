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

  async function handleAnalyze(promptKey: string) {
    setConverting(true);
    try {
      const base64Image = await imageToBase64(photoUri);
      router.push({
        pathname: "/result",
        params: { base64Image, promptKey },
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

      {converting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
          disabled={converting}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.personaRow}>
        <TouchableOpacity
          style={styles.personaButton}
          onPress={() => handleAnalyze("academic")}
          disabled={converting}
        >
          <Text style={styles.personaLabel}>🎓 Academic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.personaButton}
          onPress={() => handleAnalyze("safety")}
          disabled={converting}
        >
          <Text style={styles.personaLabel}>⚠️ Safety</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.personaButton}
          onPress={() => handleAnalyze("inventory")}
          disabled={converting}
        >
          <Text style={styles.personaLabel}>📋 Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1, resizeMode: "contain" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  retakeButton: {
    backgroundColor: "#5A6472",
    padding: 14,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  personaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  personaButton: {
    backgroundColor: "#5B3FA3",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  personaLabel: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
