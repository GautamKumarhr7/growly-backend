import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { UserModel, roles } from "../db/schema";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, role } = req.body;

    // Ensure role is a key of roles
    const typedRole = role as keyof typeof roles;

    // Validate user input
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      role: roles[typedRole],
      password: hashedPassword,
      name,
      email,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};
