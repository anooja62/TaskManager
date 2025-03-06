import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { signup } from "../services/authService";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const result = await signup(name, email, password);
    if (result.message === "User registered") {
      Alert.alert("Success", "Account created! Please log in.");
      navigation.navigate("Login");
    } else {
      Alert.alert("Error", "Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Sign Up
          </Text>

          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

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

          <Button mode="contained" onPress={handleSignup} style={styles.button}>
            Sign Up
          </Button>

          <Button mode="text" onPress={() => navigation.navigate("Login")}>
            Already have an account? Login
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
