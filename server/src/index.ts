import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dynamoose from "dynamoose";
import { is } from "date-fns/locale";
import { createClerkClient } from "@clerk/express";

/* Routes Imports */
import coursesRoutes from "./routes/coursesRoutes";
import userClerkRoutes from "./routes/userClerkRoutes";

/* Configurations */
dotenv.config();

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  dynamoose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/courses", coursesRoutes);
app.use("/users/clerk", userClerkRoutes);

/* Server */
const PORT = process.env.PORT || 8001;
if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
