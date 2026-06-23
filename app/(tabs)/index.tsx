import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Study React Native",
      completed: false,
    },
    {
      id: "2",
      title: "Finish Assignment",
      completed: false,
    },
  ]);

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {tasks.map((item) => (
        <View key={item.id} style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color="#5A6472"
          />
          <Text style={styles.taskText}>{item.title}</Text>
        </View>
      ))}
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
    color: "#1F2A44",
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D9DEE7",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  taskText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1F2A44",
  },
});
