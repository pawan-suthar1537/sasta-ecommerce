import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./db/db.js";
import userrouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import subcategoryRouter from "./routes/subcategory.route.js";
import ProductROuter from "./routes/product.route.js";
import CartROuter from "./routes/cart.route.js";
import AddressROuter from "./routes/address.route.js";

const app = express();

const FRONTEND_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:4173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
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
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/product", ProductROuter);
app.use("/api/cart", CartROuter);
app.use("/api/address", AddressROuter);

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
