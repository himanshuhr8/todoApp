import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface JwtPayload {
  email: string;
  iat: number;
  exp: number;
}
declare global {
  namespace Express {
    interface Request {
      email?: string;
      id?: number;
    }
  }
}
export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const token = header.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    const userId = decoded.email;
    const response = await prisma.user.findUnique({
      where: {
        email: userId,
      },
      select: {
        id: true,
      },
    });
    if (response) {
      req.email = userId;
      req.id = response.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
