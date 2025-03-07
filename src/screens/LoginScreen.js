import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Logged in!");
        navigation.navigate("Home");
      })
      .catch((err) => Alert.alert("Error", err));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Login
          </Text>

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>

          <Button mode="text" onPress={() => navigation.navigate("Signup")}>
            Don't have an account? Sign Up
          </Button>
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
  button: {
    marginTop: 10,
  },
});
