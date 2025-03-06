import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://your-api.com";

export const signup = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    await AsyncStorage.setItem("userToken", data.token);
  }
  return data;
};

export const logout = async () => {
  await AsyncStorage.removeItem("userToken");
};
