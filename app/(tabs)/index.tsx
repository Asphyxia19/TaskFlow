import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Enter Task" />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskRow}>
        <Text>☐ Study React Native</Text>
      </View>

      <View style={styles.taskRow}>
        <Text>☐ Finish Assignment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  taskRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
