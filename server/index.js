import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./db/db.js";
import userrouter from "./routes/user.route.js";

const app = express();

const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (_, res) => {
  res.json({ message: "server is working" });
});

app.use("/api/user", userrouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.error("Failed to connect to the database");
    process.exit(1); // exit the application with a non-zero status code
  });
