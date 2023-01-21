import express from "express"
import path from "path"
import "./config/mongoose"

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json");

import taskRouter from "./routes/taskRouter";
const app = express();

app.use(express.json());
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use("/task", taskRouter);

export default app;
