import express from "express";
import env from "dotenv";
import dbConnect from "./db/db";
const app = express();

const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
