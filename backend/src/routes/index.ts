import express from "express";
const router = express.Router();
import userRouter from "./user";
import todoRouter from "./todo";

router.use("/user", userRouter);
router.use("/todo", todoRouter);

export default router;
