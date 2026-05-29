import { NextFunction, Request, Response } from "express";
import JwtService from "../utils/jwtServices.js";
import { AppError } from "./errorHandler.js";

 const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Unauthorised User", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = JwtService.verify(token);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        return next(new AppError("Token expired", 401));
      }
    }
    return next(new AppError("Unauthorised User", 401));
  }
};
export default auth;
