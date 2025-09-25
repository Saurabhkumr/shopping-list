import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopping-list-modern.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.listen(5000, () => {
  console.log("server is running 5000! ");
});
app.get("/", (req, res) => {
  res.send("Backend is live!");
});

app.use("/api/items", itemsRouter);
