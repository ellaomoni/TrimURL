import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TrimURL API",
    version: "1.0.0",
    description: "API documentation for the TrimURL service",
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [
    path.resolve(process.cwd(), "src/modules/**/*.ts"),
    path.resolve(process.cwd(), "dist/modules/**/*.js"),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
