import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const API_URL = "http://localhost:8000";
const API_URL = "http://10.0.2.2:8000";


export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    await AsyncStorage.setItem("userToken", response.data.token);
console.log('✌️response.data.token --->', response.data.token);
    return response.data.token;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Async function for user signup
export const signupUser = createAsyncThunk("auth/signupUser", async ({ name, email, password }, { rejectWithValue }) => {
console.log('✌️signupUser --->');

  try {
    console.log('✌️API_URL}/api/auth/signup --->', `${API_URL}/api/auth/signup`);
    const response = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });


    return response.data.message;

  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Async function for user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await AsyncStorage.removeItem("userToken");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => { state.loading = true; })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export default authSlice.reducer;
