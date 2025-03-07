import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Appbar, Card, Text, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks from Redux store on mount
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchTasks()); // Refresh tasks when navigating back
    });

    return unsubscribe; // Cleanup listener when component unmounts
  }, [navigation]);

  // Logout Function with Confirmation
  const handleLogout = async () => {
    Alert.alert(
      "Logout", 
      "Are you sure you want to log out?", 
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: async () => {
            await AsyncStorage.removeItem("userToken");
            navigation.replace("Login");
          }, style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Task Manager" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
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
            </Card>
          )}
          ListEmptyComponent={<Text style={styles.noTasks}>No tasks found</Text>}
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
