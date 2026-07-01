import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  return (
    <View style={styles.container}>
      <Text>Result screen — coming in Phase 5</Text>
      <Text>{photoUri}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
