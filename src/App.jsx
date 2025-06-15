import React, { useState } from "react";
import LoginForm from "./components/auth/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 8 }}>
      {!user ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h2>Witaj, {user.name}!</h2>
          <p>Twój token: <code>{user.token}</code></p>
          <p>Pozostałe kredyty: <b>{user.credits}</b></p>
          <button onClick={() => { setUser(null); sessionStorage.removeItem("token"); }}>Wyloguj się</button>
        </div>
      )}
    </div>
  );
};

export default App;
