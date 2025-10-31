import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors.js";
import { sequelize } from "../models/index.js";
import * as userRepo from "../repositories/user.repository.js";
import { createResident } from "../repositories/resident.repository.js";
import { createResidentApartment } from "../repositories/residentApartment.repository.js";
import { getApartmentByCode } from "../repositories/apartment.repository.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };
}

async function registerService({
  username,
  password,
  full_name,
  email,
  phone,
  apartment_code,
}) {
  const t = await sequelize.transaction();
  try {
    if (!username || !password) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Username and password are required"
      );
    }

    const existUsername = await userRepo.getUserByUsername(username);
    if (existUsername) {
      throw new AppError(StatusCodes.CONFLICT, "Username already exists");
    }

    const existEmail = await userRepo.getUserByEmail(email);
    if (existEmail) {
      throw new AppError(StatusCodes.CONFLICT, "Email already in use");
    }

    const apartment = await getApartmentByCode(apartment_code);
    if (!apartment) {
      throw new AppError(StatusCodes.NOT_FOUND, "Apartment not found");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser(
      {
        username,
        password: hashed,
        role_id: 2, // Resident
        email,
        phone,
        status: 1,
      },
      { transaction: t }
    );

    const resident = await createResident(
      {
        full_name,
        user_id: user.id,
      },
      { transaction: t }
    );

    await createResidentApartment(
      {
        resident_id: resident.id,
        apartment_id: apartment.id,
      },
      { transaction: t }
    );

    const payload = {
      sub: user.id,
      username: user.username,
      role_id: user.role_id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await t.commit();

    return { user: publicUser(user), token };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function loginService({ username, password }) {
  if (!username || !password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Missing login credentials");
  }

  const user = await userRepo.getUserByUsername(username);
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid login credentials");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid login credentials");
  }

  if (user.status === 0) {
    throw new AppError(StatusCodes.FORBIDDEN, "Account is inactive");
  }

  const payload = {
    sub: user.id,
    username: user.username,
    role_id: user.role_id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user: publicUser(user), token };
}

async function me(userId) {
  const user = await userRepo.getUserById(userId);
  return publicUser(user);
}

export const authService = {
  registerService,
  loginService,
  me,
};
