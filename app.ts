import express from "express";
import cors from "cors";
import { userRegister } from "./controllers/userRegister";
import { userLogin } from "./controllers/login";
import { authMiddleware } from "./middlewares/auth.middleware";
import adCreativeRoutes from "./routes/adCreatives";

const app = express();

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Growly API" });
});

// Public routes
app.post("/register", userRegister);
app.post("/login", userLogin);

// Protected routes
app.use("/api/creatives", adCreativeRoutes);

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to Growly API" });
});

export default app;
