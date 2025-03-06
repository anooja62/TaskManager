import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { Appbar, Button, Card, Text, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://your-api.com"; // Replace with your backend URL

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Task Manager" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      {/* Task List */}
      {tasks.length === 0 ? (
        <View style={styles.centeredView}>
          <Text variant="titleLarge">No tasks available</Text>
          <Text>Add a task to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              mode="elevated"
              onPress={() => navigation.navigate("TaskDetails", { task: item })}
            >
              <Card.Title title={item.title} titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}

      {/* Floating Action Button */}
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#6200ea",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ea",
  },
});
