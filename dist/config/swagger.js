"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "TrimURL API",
        version: "1.0.0",
        description: "API documentation for the TrimURL service",
    },
    servers: [
        {
            url: `http://localhost:${env_1.env.PORT}`,
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
        path_1.default.resolve(process.cwd(), "src/modules/**/*.ts"),
        path_1.default.resolve(process.cwd(), "dist/modules/**/*.js"),
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map