import jwt, { SignOptions } from "jsonwebtoken";
import type { IJwtPayload } from "../@types/payload.types.js";
import { config } from "../config/index.js";

class JwtService {
  static sign(
    payload: string | Buffer | object,
    expiry: SignOptions["expiresIn"] = "1h",
    secret: string = config.ACCESS_SECRET ?? "",
  ): string {
    const options: SignOptions = { expiresIn: expiry };
    return jwt.sign(payload, secret, options);
  }

  static verify(
    token: string,
    secret: string = config.ACCESS_SECRET ?? "",
  ): IJwtPayload {
    return jwt.verify(token, secret) as IJwtPayload;
  }
}

export default JwtService;
