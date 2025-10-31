import { getApartmentByUserId } from "../repositories/apartment.repository.js";
import { getResidentApartmentByResidentId } from "../repositories/residentApartment.repository.js";
import {
  getUserById,
  getUserWithResident,
  updateUser,
  updateUserWithResident,
} from "../repositories/user.repository.js";
import { comparePassword, hashPassword } from "../validations/password.js";
import { User, Apartment, Resident } from "../models/index.js";

const handleGetProfile = async (userId) => {
  const result = await getUserWithResident(userId);
  const { email, phone, resident } = result;
  if (resident) {
    const {
      full_name,
      gender,
      id_card,
      dob,
      hometown,
      ethnicity,
      occupation,
      household_no,
    } = resident;
    return {
      email,
      full_name,
      phone,
      gender,
      id_card,
      dob,
      hometown,
      ethnicity,
      occupation,
      household_no,
    };
  } else {
    return { email, phone };
  }
};

const handleUpdateProfile = async (
  userId,
  email,
  full_name,
  phone,
  gender,
  id_card,
  dob,
  hometown,
  ethnicity,
  occupation
) => {
  return await updateUserWithResident(userId, {
    email,
    full_name,
    phone,
    gender,
    id_card,
    dob,
    hometown,
    ethnicity,
    occupation,
  });
};

const handleUpdatePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  // Implementation for updating password goes here
  const { password } = await getUserById(userId);

  const isMatch = await comparePassword(oldPassword, password);

  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirm password do not match");
  }

  const hashedNewPassword = await hashPassword(newPassword);
  await updateUser(userId, { password: hashedNewPassword });

  return {
    success: true,
  };
};

const handleGetApartment = async (userId) => {
  const apartment = await getApartmentByUserId(userId);
  const { owner } = apartment;
  const residentId = owner.id;
  const residentApartment = await getResidentApartmentByResidentId(residentId);

  return { apartment, residentApartment };
};

async function handleFetchResident(userId) {
  try {
    if (!userId) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const resident = await Resident.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Apartment,
          as: "apartments",
          attributes: ["id", "apartment_code", "building", "area", "floor"],
        },
        {
          model: User,
          as: "user",
          attributes: ["username", "email", "phone"],
        },
      ],
    });

    if (!resident) {
      throw new AppError(StatusCodes.NOT_FOUND, "Resident profile not found");
    }

    const result = {
      fullName: resident.full_name,
      apartments: resident.apartments.map((a) => ({
        apartmentCode: a.apartment_code,
        floor: a.floor,
        building: a.building,
        relationship: a.ResidentApartment.relationship,
        startDate: a.ResidentApartment.start_date,
      })),
    };

    return result;
  } catch (err) {
    throw err;
  }
}

export {
  handleGetProfile,
  handleUpdateProfile,
  handleUpdatePassword,
  handleGetApartment,
  handleFetchResident,
};
