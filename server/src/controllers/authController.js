import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { markMongoUnavailable, usingMongo } from "../config/db.js";
import { demoUsers } from "../data/demoStore.js";
import { User } from "../models/User.js";

const jwtSecret = process.env.JWT_SECRET || "dev-secret";

function publicUser(user) {
  const source = user.toObject ? user.toObject() : user;
  const { passwordHash, ...safeUser } = source;
  return {
    ...safeUser,
    id: source.id || source._id?.toString()
  };
}

function createToken(user) {
  return jwt.sign({ id: user.id || user._id.toString(), role: user.role }, jwtSecret, {
    expiresIn: "7d"
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let user = demoUsers.find((item) => item.email === email.toLowerCase());

  if (usingMongo()) {
    try {
      const mongoUser = await User.findOne({ email: email.toLowerCase() });
      user = mongoUser || user;
    } catch (error) {
      markMongoUnavailable(error);
    }
  }

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: createToken(user),
    user: publicUser(user)
  });
}

export async function register(req, res) {
  const { name, email, password, role, department, semester, skills, portfolio, title } = req.body;

  if (!name || !email || !password || !role || !department) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  if (!usingMongo()) {
    return res.status(400).json({
      message: "Registration needs MongoDB. Use demo accounts until MONGO_URI is configured."
    });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email.toLowerCase() });
  } catch (error) {
    markMongoUnavailable(error);
    return res.status(503).json({
      message: "MongoDB is unavailable. Use demo accounts until the database connection is fixed."
    });
  }
  if (existingUser) {
    return res.status(409).json({ message: "A user with this email already exists" });
  }

  let user;
  try {
    user = await User.create({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      role,
      department,
      semester,
      skills,
      portfolio,
      title
    });
  } catch (error) {
    markMongoUnavailable(error);
    return res.status(503).json({
      message: "MongoDB is unavailable. Use demo accounts until the database connection is fixed."
    });
  }

  res.status(201).json({
    token: createToken(user),
    user: publicUser(user)
  });
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) });
}
