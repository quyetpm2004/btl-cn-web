import {
  Apartment,
  Resident,
  User,
  ApartmentType,
  ResidentApartment,
} from "../models/index.js";

async function getApartmentByCode(apartment_code) {
  return Apartment.findOne({ where: { apartment_code } });
}

async function getApartmentByUserId(userId) {
  return Apartment.findOne({
    include: [
      {
        model: Resident,
        as: "owner",
        required: true,
        include: [
          {
            model: User,
            as: "user",
            required: true,
            where: { id: userId },
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      },
      {
        model: ApartmentType,
        as: "type",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
}

export { getApartmentByCode, getApartmentByUserId };
