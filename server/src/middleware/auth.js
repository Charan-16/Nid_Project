import jwt from "jsonwebtoken";
import { markMongoUnavailable, usingMongo } from "../config/db.js";
import { demoUsers } from "../data/demoStore.js";
import { User } from "../models/User.js";

const jwtSecret = process.env.JWT_SECRET || "dev-secret";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    let user = demoUsers.find((item) => item.id === payload.id);

    if (usingMongo()) {
      try {
        user = await User.findById(payload.id).select("-passwordHash");
      } catch (error) {
        markMongoUnavailable(error);
      }
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission" });
    }

    next();
  };
}
