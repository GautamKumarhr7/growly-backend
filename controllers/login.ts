import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { UserModel, roles } from "../db/schema";
import * as jwt from "jsonwebtoken";
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user?.password as string);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("tpken", process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Successful login
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    next(err);
  }
};
