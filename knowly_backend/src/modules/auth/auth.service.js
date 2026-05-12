import bcrypt from "bcrypt";

import * as authRepo from "./auth.repository.js";
import { generateToken } from "../../utils/jwt.js";

export const register = async (body) => {
  const existingUser = await authRepo.findByEmail(body.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await authRepo.createUser({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  const token = generateToken({
    id: user.id,
  });

  return {
    message: "Register successful",
  };
};

export const login = async (body) => {
  const user = await authRepo.findByEmail(body.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};

export const getMe = async (userId) => {
  const user = await authRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};