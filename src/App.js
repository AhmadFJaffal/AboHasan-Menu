import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddMenuItemForm from "./components/AddMenuItem/AddMenuItem";
import MainPage from "./main";
import SignIn from "./components/signin/SignIn";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
      // User not logged in, redirect to main
      return <Navigate to="/" />;
    }

    return children;
  };
  // In your component
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/add-item"
              element={
                <ProtectedRoute>
                  <AddMenuItemForm />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<MainPage />} />
            <Route path="signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
