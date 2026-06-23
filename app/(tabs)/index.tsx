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
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
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

  async function deleteTask(taskId: string) {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", taskId);

          if (error) {
            console.log(error);
            Alert.alert("Error", "Failed to delete task");
            return;
          }

          fetchTasks();
        },
      },
    ]);
  }

  const renderRightActions = (taskId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(taskId)}
      >
        <MaterialIcons name="delete" size={28} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Swipeable
              key={item.id}
              renderRightActions={() => renderRightActions(item.id)}
            >
              <View style={styles.taskRow}>
                <TouchableOpacity
                  onPress={() => toggleTask(item.id, item.completed)}
                >
                  <MaterialIcons
                    name={
                      item.completed ? "check-box" : "check-box-outline-blank"
                    }
                    size={22}
                    color="#5A6472"
                  />
                </TouchableOpacity>

                <Text style={styles.taskText}>{item.title}</Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
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
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },

  taskText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1F2A44",
  },

  deleteButton: {
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 2,
  },
});
