 Full Stack Task Manager App with Authentication

 
 📌 Project Overview
A React Native (Expo) app with a Node.js and MongoDB backend that allows users to sign up, log in, and manage tasks (CRUD operations). The app implements token-based authentication using JWT and AsyncStorage.

 🛠️ Tech Stack
Frontend (React Native with Expo)
- State Management: Redux Toolkit
- Navigation: React Navigation (Stack Navigator)
- Storage: AsyncStorage (JWT tokens)
- UI Library: React Native Paper

Backend (Node.js, Express, MongoDB)
- Framework: Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT (jsonwebtoken) & bcrypt.js
- Middleware: CORS, Express JSON

---

 🚀 Features & Screens
 🔐 Authentication
- Signup Screen: Users can register with name, email, and password.
- Login Screen: Users can log in using email and password.
- Token-based Authentication: JWT stored in AsyncStorage.

 📋 Task Management
- Home Screen: Fetch and display tasks from the backend.
  - Implemented pull-to-refresh.
- Add Task Screen: Create a task (title + description).
- Home Screen: View task details, edit, or delete tasks.
- Logout: Clears the stored token and navigates to the Login screen.

---

 🔧 API Endpoints
 Authentication (JWT-based)
- `POST /api/auth/signup` → Register a new user
- `POST /api/auth/login` → Authenticate user and return JWT

 Task Management (Protected Routes - Requires JWT)
- `POST /api/tasks` → Create a new task
- `GET /api/tasks` → Get all tasks for the logged-in user
- `GET /api/tasks/:id` → Get a specific task
- `PUT /api/tasks/:id` → Update a task
- `DELETE /api/tasks/:id` → Delete a task

---

 🛠️ Setup & Installation
 📌 Backend Setup
1. Clone the backend repository:
   
   git clone <backend-repo-url>
   cd backend
  
2. Install dependencies:
 
   npm install

3. Create a `.env` file and add MongoDB URI & JWT secret:
  
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_secret
  
4. Start the server:

   npm start
 

 📌 Frontend Setup
1. Clone the frontend repository:
 
   git clone <frontend-repo-url>
   cd frontend

2. Install dependencies:

   npm install

3. Start the app:

   npx expo start
   npm run android


---

 🎯 Deployment
 🔹 Backend Deployment
- Deployed the backend on Vercel


🔹 Frontend Deployment

- Generated an APK for testing:
 
  expo build:android
  

Backend Deployment: https://task-manager-backend-liart-nine.vercel.app/
Expo Go APK Link: https://expo.dev/artifacts/eas/2gktViEGSCBmGdvDfC5k7c.apk
