import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { mockAuth } from "./data/mockData";
import { Toaster } from "./components/ui/toaster";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// Context for theme and auth
export const ThemeContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Check authentication status on app load
    const authStatus = mockAuth.isAuthenticated();
    setIsAuthenticated(authStatus);
    if (authStatus) {
      setUser(mockAuth.getCurrentUser());
    }
  }, []);

  const login = async (email, password) => {
    const result = mockAuth.login(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setUser(result.user);
    }
    return result;
  };

  const signup = async (name, email, password) => {
    const result = mockAuth.signup(name, email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    mockAuth.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const authContextValue = {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  };

  const themeContextValue = {
    theme,
    toggleTheme
  };

  return (
    <div className="App min-h-screen bg-background text-foreground">
      <AuthContext.Provider value={authContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <BrowserRouter>
            <Routes>
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/signup" 
                element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/payments" 
                element={isAuthenticated ? <Payments /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/analytics" 
                element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/" 
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
              />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;