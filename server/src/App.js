import express from "express";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import "dotenv/config";
import "./passport.config";
import userRoutes from "./routes/user.routes";
import catRoutes from "./routes/category.routes";
import itemRoutes from "./routes/item.routes";
import config from "./config";

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(compress());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());

app.use("/", userRoutes);
app.use("/", catRoutes);
app.use("/", itemRoutes);

export default app;
