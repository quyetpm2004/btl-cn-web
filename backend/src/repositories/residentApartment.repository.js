import { ResidentApartment } from "../models/index.js";

async function createResidentApartment(residentApartmentData, options = {}) {
  return ResidentApartment.create(residentApartmentData, options);
}

async function getResidentApartmentByResidentId(residentId) {
  return ResidentApartment.findOne({ where: { resident_id: residentId } });
}

export { createResidentApartment, getResidentApartmentByResidentId };
