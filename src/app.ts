// Express set up 
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import linksRoutes from "./modules/links/links.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/links", linksRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;