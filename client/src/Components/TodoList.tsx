import { useState, useEffect } from "react";
import { authState } from "../store/authState.js";
import { useRecoilValue } from "recoil";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Todo {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

type TodoArray = Todo[];

const TodoList = () => {
  const [todos, setTodos] = useState<TodoArray>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authStateValue = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        "https://ts-todo-app-7qg5.onrender.com/todo/todos",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Todo: Create a type for the response that you get back from the server
      const data: Todo[] = await response.json();
      setTodos(data);
    };
    // console.log("login - ", authStateValue.username);
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be blank.");
      return;
    }
    const response = await fetch(
      "https://ts-todo-app-7qg5.onrender.com/todo/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      }
    );
    const data = await response.json();

    let newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      newTodos.push(todos[i]);
    }

    newTodos.push(data);
    setTodos(newTodos);
  };

  const markDone = async (id: string) => {
    const response = await fetch(
      `https://ts-todo-app-7qg5.onrender.com/todo/todos/${id}/done`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const updatedTodo = await response.json();
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(
      `https://ts-todo-app-7qg5.onrender.com/todo/todos/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    if (response.ok) {
      setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
    } else {
      console.error("Failed to delete todo");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <h2>Welcome </h2>
          <h3>{authStateValue.username}</h3>
        </div>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "35px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Typography
            variant="h5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h2>Add Todo</h2>
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              style={{ width: "100%", marginTop: "20px" }}
              variant="outlined"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <TextField
              style={{ width: "100%", marginTop: "20px" }}
              variant="outlined"
              type="text"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Button
              onClick={addTodo}
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Add Todo
            </Button>
          </div>
        </Card>
      </div>

      <Typography
        variant="h5"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <h2>Todo List</h2>
      </Typography>

      <div
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {todos.map((todo) => (
          <Card
            style={{
              width: "300px",
              padding: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            key={todo._id}
          >
            <div>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                {todo.title}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                {todo.description}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              {todo.done ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Done
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => markDone(todo._id)}
                >
                  Mark as Done
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
