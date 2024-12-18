import express, { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";
import cookieParser from "cookie-parser";
const router = express.Router();
const prisma = new PrismaClient();
router.use(cookieParser());
router.use(express.json());

const todoSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
});
router.post(
  "/add",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const validation = todoSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ message: "Invalid inputs" });
      return;
    }
    try {
      const { title, description } = validation.data;
      const userId = req.id!;

      const response = await prisma.todo.create({
        data: {
          title: title,
          description: description || null,
          userId: userId,
        },
      });
      if (response) {
        res.status(200).json({ message: "Todo added successfully" });
        return;
      } else {
        res.status(400).json({ message: "Internal Server error" });
        return;
      }
    } catch (e) {
      res.status(400).json({ message: "Internal Server error" });
      return;
    }
  }
);
router.put("/delete", authMiddleware, async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const response = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    if (response) {
      res.status(200).json({ message: "Deleted successfully" });
      return;
    } else {
      res.status(400).json({ message: "Internal Server error" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: "Internal Server error" });
    return;
  }
});
const updateSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const response = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        completed: true,
      },
    });
    if (response) {
      res.status(200).json({ message: "Updated successfully" });
      return;
    } else {
      res.status(400).json({ message: "Internal Server error" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: "Internal Server error" });
    return;
  }
});
router.put("/edit", authMiddleware, async (req, res) => {
  const validation = updateSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }
  try {
    const todoId = req.body.todoId;
    const response = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: validation.data.title,
        description: validation.data.description,
        completed: validation.data.completed,
      },
    });
    if (response) {
      res.status(200).json({ message: "Todo edited successfully" });
      return;
    } else {
      res.status(400).json({ message: "Internal Server error" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: "Internal Server error" });
    return;
  }
});
router.get("/todos", authMiddleware, async (req, res) => {
  try {
    const userId = req.id!;
    const response = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });
    if (response) {
      res.status(200).json({ todos: response });
      return;
    } else {
      res.status(400).json({ message: "Internal Server error" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: "Internal Server error" });
    return;
  }
});
export default router;
