import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (data.status === "success" && data.data.token) {
        sessionStorage.setItem("token", data.data.token);
        // Przekaż dane do rodzica lub ustaw stan globalny
        onLoginSuccess && onLoginSuccess(data.data);
      } else {
        setError(data.message || "Błąd logowania");
      }
    } catch (err) {
      setError("Błąd połączenia z serwerem");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <a href="/reset-password">Resetuj hasło</a> |{" "}
        <a href="/register">Zarejestruj się</a>
      </div>
    </form>
  );
};

export default LoginForm;
