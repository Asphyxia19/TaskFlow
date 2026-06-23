import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setTasks(data || []);
  }

  async function addTask() {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a task");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title: task,
        completed: false,
      },
    ]);

    if (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add task");
      return;
    }

    setTask("");
    fetchTasks();
  }

  async function toggleTask(taskId: string, currentStatus: boolean) {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !currentStatus,
      })
      .eq("id", taskId);

    if (error) {
      console.log(error);
      return;
    }

    fetchTasks();
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

      <ScrollView>
        {tasks.map((item) => (
          <View key={item.id} style={styles.taskRow}>
            <TouchableOpacity
              onPress={() => toggleTask(item.id, item.completed)}
            >
              <MaterialIcons
                name={item.completed ? "check-box" : "check-box-outline-blank"}
                size={22}
                color="#5A6472"
              />
            </TouchableOpacity>

            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
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
