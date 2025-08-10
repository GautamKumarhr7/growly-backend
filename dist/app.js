"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRegister_1 = require("./controllers/userRegister");
const login_1 = require("./controllers/login");
const adCreatives_1 = __importDefault(require("./routes/adCreatives"));
const app = (0, express_1.default)();
// Enable CORS for your frontend
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Growly API" });
});
// Public routes
app.post("/register", userRegister_1.userRegister);
app.post("/login", login_1.userLogin);
// Protected routes
app.use("/api/creatives", adCreatives_1.default);
app.get("/api", (req, res) => {
    res.send({ message: "Welcome to Growly API" });
});
exports.default = app;
//# sourceMappingURL=app.js.map