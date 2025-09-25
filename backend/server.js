import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use("/api/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
