
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password";

// Make sure "loggedInUser" is found in LocalStorage
const isLoggedIn = () => !!localStorage.getItem("loggedInUser");

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If Logged in redirect to DetailsPage
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/detail");
    }
  }, [navigate]);

  // If Credentials are correct --> DetailsPage.
  // If not --> Error 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("loggedInUser", username);
      navigate("/detail");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username-input"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
