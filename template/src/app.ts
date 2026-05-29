import cors from "cors";
import express, { Request, Response } from "express";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

/* ---------- Global Middlewares ---------- */
app.use(express.json());


app.use(
  cors({
    origin: (origin, callback) => {
      const isAllowed = origin && (origin.startsWith('http://localhost:') || origin === config.ORIGIN_FRONTEND);
      if (!origin || isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

/* ---------- Health Check ---------- */
app.get("/", (req: Request, res: Response) => {
	res.json({
		status: "ok",
		message: "Server is running",
	});
});

/* ---------- Routes ---------- */



// app.use("/api/cart", cartRoutes);

/* ---------- 404 ---------- */
app.use(notFound);

/* ---------- Error Handler ---------- */
app.use(errorHandler);

export default app;
