import express from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();
router.use(cookieParser());
router.use(express.json());

const signUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).min(3),
  lastName: z.string().max(100),
  password: z.string().min(8).max(15),
});

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  const validation = signUpSchema.safeParse(body);
  if (!validation.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }
  const { email, firstName, lastName, password } = validation.data;
  try {
    const checkResponse = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (checkResponse) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const response = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (response) {
      const jwtToken = jwt.sign(
        { email: email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ message: "User signed up successfully", token: jwtToken });
      return;
    } else {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(15),
});
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }
  const { email, password } = validation.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid user and password" });
      return;
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "Invalid user and password" });
      return;
    }
    const jwtToken = jwt.sign(
      { email: email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "User logged in successfully", token: jwtToken });
    return;
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

const updateSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  password: z.string().max(15).optional(),
});
router.put(
  "/update",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const validation = updateSchema.safeParse(body);
      if (!validation.success) {
        res.status(400).json({ message: "Invalid inputs" });
        return;
      }

      // Prepare the data for updating
      const updateData: {
        firstName?: string;
        lastName?: string;
        password?: string;
      } = {};

      // Only include password if it is provided and valid
      if (validation.data.password && validation.data.password.length > 1) {
        const password = validation.data.password;
        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        updateData.password = bcrypt.hashSync(password, salt);
      }

      // Only update firstName and lastName if provided
      if (validation.data.firstName) {
        updateData.firstName = validation.data.firstName;
      }
      if (validation.data.lastName) {
        updateData.lastName = validation.data.lastName;
      }

      const response = await prisma.user.update({
        where: {
          email: req.email,
        },
        data: updateData,
      });

      if (response) {
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    if (response) {
      res.status(200).json({ user: response });
      return;
    } else {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});
export default router;
