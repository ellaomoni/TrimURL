import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appErrors";
import { generateToken } from "../../utils/jwt";
import { generateVerificationCode } from "../../utils/generateVerificationCodes";
import { sendVerificationEmail } from "../../utils/email";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterInput) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    emailVerificationCode: verificationCode,
    emailCodeExpiresAt: expiresAt,
  },
  select: {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    createdAt: true,
  },
});
await sendVerificationEmail(email, verificationCode);

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user,
    token,
  };
};

export const loginUser = async (payload: LoginInput) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.emailVerified) {
  throw new AppError("Please verify your email before logging in", 403);
}

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const verifyUserEmail = async (email: string, code: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.emailVerified) {
    throw new AppError("Email already verified", 400);
  }

  if (!user.emailVerificationCode || !user.emailCodeExpiresAt) {
    throw new AppError("Verification code not found", 400);
  }

  if (user.emailVerificationCode !== code) {
    throw new AppError("Invalid verification code", 400);
  }

  if (user.emailCodeExpiresAt < new Date()) {
    throw new AppError("Verification code has expired", 400);
  }

  const verifiedUser = await prisma.user.update({
    where: { email },
    data: {
      emailVerified: true,
      emailVerificationCode: null,
      emailCodeExpiresAt: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
    },
  });

  return verifiedUser;
};