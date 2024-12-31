import express, { Application } from "express";
import cors from "cors";
import mainRouter from "./routes/index";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
app.use(cors({}));
app.use(express.json());

app.use("/api/v1", mainRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
