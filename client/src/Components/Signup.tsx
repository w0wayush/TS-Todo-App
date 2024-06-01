import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    // Todo: Create a type for the response that you get back from the server
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } else {
      alert("Error while signing up");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "35px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Typography variant="h4">
          <b>Signup</b>
        </Typography>
        <div style={{ marginTop: "20px" }}>
          <TextField
            style={{ width: "100%", marginTop: "20px" }}
            variant="outlined"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextField
            style={{ width: "100%", marginTop: "20px" }}
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            style={{ width: "150px" }}
            onClick={handleSignup}
          >
            Sign UP
          </Button>
          <br />
          <div>
            New here?{"   "}
            <Button
              variant="outlined"
              style={{ width: "150px", marginLeft: "5px" }}
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
