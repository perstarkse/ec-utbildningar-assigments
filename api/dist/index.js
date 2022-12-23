"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const articles_router_1 = require("./routes/articles.router");
const dotenv = __importStar(require("dotenv"));
const users_router_1 = require("./routes/users.router");
const express_graphql_1 = require("express-graphql");
const schema_graphql_1 = require("./graphql/schema.graphql");
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/articles", articles_router_1.articleRouter);
    app.use("/users", users_router_1.userRouter);
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: schema_graphql_1.graphqlSchema,
        graphiql: true,
    }));
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
