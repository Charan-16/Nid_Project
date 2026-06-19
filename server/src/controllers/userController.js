import bcrypt from "bcryptjs";
import { markMongoUnavailable, usingMongo } from "../config/db.js";
import { demoUsers } from "../data/demoStore.js";
import { User } from "../models/User.js";

function stripPassword(user) {
  const source = user.toObject ? user.toObject() : user;
  const { passwordHash, ...safeUser } = source;
  return {
    ...safeUser,
    id: source.id || source._id?.toString()
  };
}

export async function listUsers(req, res) {
  const { role, department } = req.query;

  if (!usingMongo()) {
    let users = demoUsers;
    if (role) users = users.filter(u => u.role === role);
    if (department) users = users.filter(u => u.department === department);
    return res.json(users.map(stripPassword));
  }

  try {
    const filter = {};
    if (role) filter.role = role;
    if (department) filter.department = department;

    const users = await User.find(filter).select("-passwordHash").sort({ name: 1 });
    return res.json(users.map(stripPassword));
  } catch (error) {
    markMongoUnavailable(error);
    let users = demoUsers;
    if (role) users = users.filter(u => u.role === role);
    if (department) users = users.filter(u => u.department === department);
    return res.json(users.map(stripPassword));
  }
}

export async function createUser(req, res) {
  const { name, email, role, department, semester } = req.body;
  const passwordHash = bcrypt.hashSync("password123", 10);

  const userData = {
    id: `u-${Date.now()}`,
    name,
    email,
    role: role || "student",
    department,
    semester,
    passwordHash
  };

  if (!usingMongo()) {
    demoUsers.push(userData);
    return res.status(201).json(stripPassword(userData));
  }

  try {
    const user = await User.create({
      ...userData,
      email: email.toLowerCase()
    });
    return res.status(201).json(stripPassword(user));
  } catch (error) {
    markMongoUnavailable(error);
    demoUsers.push(userData);
    return res.status(201).json(stripPassword(userData));
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  if (!usingMongo()) {
    const index = demoUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      demoUsers.splice(index, 1);
      return res.status(204).send();
    }
    return res.status(404).json({ message: "User not found" });
  }

  try {
    await User.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    markMongoUnavailable(error);
    const index = demoUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      demoUsers.splice(index, 1);
      return res.status(204).send();
    }
    return res.status(404).json({ message: "User not found" });
  }
}


export async function updateUser(req, res) {
  const { id } = req.params;
  if (!usingMongo()) {
    const index = demoUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      demoUsers[index] = { ...demoUsers[index], ...req.body };
      return res.json(stripPassword(demoUsers[index]));
    }
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(stripPassword(user));
  } catch (error) {
    markMongoUnavailable(error);
    const index = demoUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      demoUsers[index] = { ...demoUsers[index], ...req.body };
      return res.json(stripPassword(demoUsers[index]));
    }
    return res.status(404).json({ message: 'User not found' });
  }
}