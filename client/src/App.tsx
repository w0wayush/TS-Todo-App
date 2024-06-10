import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TodoList from "./Components/TodoList";
import useSWR from "swr";
import Home from "./Components/Home";
import Appbar from "./Components/Appbar";
// import { useEffect } from "react";
import { authState } from "./store/authState";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Appbar />
        <InitState />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

const fetcher = async ({ url }: { url: string }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return response.json();
};

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const { data, error } = useSWR(
    { url: "https://ts-todo-app-7qg5.onrender.com/auth/me" },
    fetcher
  );

  if (error) {
    console.error("Error fetching data:", error);
  }

  if (!data) {
    console.log("Error fetching data in app.tsx");
    return <></>;
  }

  // console.log(data);
  setAuth(data);
  return <></>;
}

/* function InitState2() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://ts-todo-app-7qg5.onrender.com/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
} */

export default App;
