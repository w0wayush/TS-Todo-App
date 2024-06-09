import express from "express";
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import { todoInputProps } from "@ayushw0w/z0z";
const router = express.Router();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post("/createTodo", authenticateJwt, (req, res) => {
  try {
    const parsedInput = todoInputProps.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const title = parsedInput.data.title;
    const description = parsedInput.data.description;

    const done = false;
    const userId = req.headers["userId"];

    const newTodo = new Todo({ title, description, done, userId });

    newTodo
      .save()
      .then((savedTodo) => {
        res.status(201).json(savedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create a new todo" });
      });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to create Todo",
    });
  }
});

router.get("/todos", authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve todos" });
    });
});

router.patch("/todos/:todoId/done", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

router.delete("/todos/:todoId", authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndDelete({ _id: todoId, userId }, { done: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete todo" });
    });
});

export default router;
