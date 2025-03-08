import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/slices/authSlice";

const ResetPassword = ({ navigation, route }) => {
    const { email } = route.params;
console.log('✌️email --->', email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();


  
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "All fields are required");
    }
  
    if (newPassword.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters long");
    }
  
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }
  
    dispatch(resetPassword({ email, newPassword }))
      .unwrap()
      .then((message) => {
        Alert.alert("Success", message);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Reset Password Error:", error);
        Alert.alert("Error", error?.message || "Something went wrong. Please try again.");
      });
      
  };
  

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Set New Password
          </Text>

          <TextInput
            label="New Password"
            mode="outlined"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />

<Button 
  mode="contained" 
  onPress={handleResetPassword} 
  style={styles.button}
  disabled={!email.trim()} // ✅ Disable if email is missing
>
  Reset Password
</Button>


          <Button mode="text" onPress={() => navigation.goBack()}>
            Back to Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ResetPassword;

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
