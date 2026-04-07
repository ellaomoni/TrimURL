// Express set up 
import express from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;