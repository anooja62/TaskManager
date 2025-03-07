import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Card,
  Text,
  FAB,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/slices/taskSlice"; // Import deleteTask action
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser ,checkLoginStatus} from "../redux/slices/authSlice";
export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [refreshing, setRefreshing] = useState(false);
  const { userToken } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkLoginStatus()); // Ensure Redux fetches updated token
  }, [dispatch]);
  useEffect(() => {
    console.log('✌️userToken --->', userToken);
    if (!userToken) {

      navigation.replace("Login"); // Navigate only when Redux clears the token
    }
  }, [userToken, navigation]);
  useEffect(() => {
    dispatch(fetchTasks());
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchTasks());
    });

    return unsubscribe;
  }, [navigation]);

  // Pull-to-refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks()); // Fetch updated tasks
    setRefreshing(false);
  };

  // Delete Task with Confirmation
  // Delete Task with Confirmation
  const handleDeleteTask = (taskId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await dispatch(deleteTask(taskId)).unwrap(); // Wait for Redux action to complete
            Alert.alert("Success", "Task deleted successfully!");
          } catch (error) {
            Alert.alert("Error", error || "Failed to delete task");
          }
        },
        style: "destructive",
      },
    ]);
  };

  // Logout Function
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await dispatch(logoutUser()).unwrap(); // Wait for Redux update
          } catch (error) {
            Alert.alert("Error", error || "Logout failed");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Task Manager" titleStyle={{ color: "white" }} />
        <Appbar.Action icon="logout" color="white" onPress={handleLogout} />
      </Appbar.Header>

      {/* Loading Indicator */}
      {loading && !refreshing ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.title} titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
              {/* Edit & Delete Icons */}
              <Card.Actions>
                <IconButton
                  icon="pencil"
                  iconColor="#6200ea"
                  onPress={() => navigation.navigate("AddTask", { task: item })}
                />

                <IconButton
                  icon="delete"
                  iconColor="red"
                  onPress={() => handleDeleteTask(item._id)}
                />
              </Card.Actions>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={styles.noTasks}>No tasks found</Text>
          }
          refreshing={refreshing} // Pull-to-refresh state
          onRefresh={handleRefresh} // Function to call on pull-down
        />
      )}

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("AddTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContainer: {
    padding: 20,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#6200ea",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ea",
  },
  noTasks: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
