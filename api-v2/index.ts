import express from "express";
import { connectToDatabase } from "./services/database.service"
import { articleRouter } from "./routes/articles.router";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/users.router";
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from "./graphql/schema.graphql";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;

connectToDatabase()
    .then(() => {
        app.use("/articles", articleRouter);
        app.use("/users", userRouter);
        app.use("/graphql",
            graphqlHTTP({
                schema: graphqlSchema,
                graphiql: true,
            })
        );

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });