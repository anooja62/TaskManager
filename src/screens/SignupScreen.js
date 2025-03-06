import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = () => {
console.log('✌️handleSignup --->');
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    dispatch(signupUser({ name, email, password }))

      .unwrap()
      .then(() => {
        Alert.alert("Success", "Account created! Please log in.");
        navigation.navigate("Login");
      })
      .catch((err) => Alert.alert("Error", err));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Sign Up
          </Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

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

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
            loading={loading}
            disabled={loading || !name || !email || !password}
          >
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
