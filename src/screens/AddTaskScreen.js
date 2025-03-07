import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../redux/slices/taskSlice";

export default function AddTaskScreen({ navigation, route }) {
  const taskToEdit = route.params?.task; // Get task if editing
  const [title, setTitle] = useState(taskToEdit?.title || ""); // Prefill title
  const [description, setDescription] = useState(taskToEdit?.description || ""); // Prefill description
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (taskToEdit) {
      // Edit Task
      dispatch(updateTask({ id: taskToEdit._id, title, description }))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Task updated successfully!");
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err || "Failed to update task"));
    } else {
      // Add New Task
      dispatch(createTask({ title, description }))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Task added successfully!");
          setTitle("");
          setDescription("");
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err || "Failed to add task"));
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            {taskToEdit ? "Edit Task" : "Add New Task"}
          </Text>

          <TextInput
            label="Task Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            label="Task Description"
            mode="outlined"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            style={[styles.input, styles.descriptionInput]}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </Button>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
  },
  descriptionInput: {
    height: 120,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
