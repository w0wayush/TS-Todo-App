import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authState";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(
      "https://ts-todo-app-7qg5.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    // Todo: Create a type for the response that you get back from the server
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setAuthState({ token: data.token, username });
      //   console.log("login - ", username);
      navigate("/todos");
    } else {
      alert("invalid credentials");
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
          <b>Login</b>
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <br />
          <div>
            New here?{"   "}
            <Button
              variant="outlined"
              style={{ width: "150px", marginLeft: "5px" }}
            >
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
