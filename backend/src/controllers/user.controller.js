import {
  handleFetchResident,
  handleGetApartment,
  handleGetProfile,
  handleUpdatePassword,
  handleUpdateProfile,
} from "../services/user.service.js";
import { AppError } from "../utils/errors.js";

const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const data = await handleGetProfile(id);
    return res.status(200).json({ message: "Get profile successful", data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.user;
  const {
    email,
    full_name,
    phone,
    gender,
    id_card,
    dob,
    hometown,
    ethnicity,
    occupation,
  } = req.body;
  try {
    const data = await handleUpdateProfile(
      id,
      email,
      full_name,
      phone,
      gender,
      id_card,
      dob,
      hometown,
      ethnicity,
      occupation
    );
    return res.status(200).json({ message: "Update profile successful", data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const data = await handleUpdatePassword(
      id,
      oldPassword,
      newPassword,
      confirmPassword
    );
    return res
      .status(200)
      .json({ message: "Update password successful", data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getApartment = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await handleGetApartment(2);
    return res.status(200).json({ message: "Get apartment successful", data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const fetchResident = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await handleFetchResident(id);
    return res.status(200).json({ message: "Fetch resident successful", user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export {
  getProfile,
  updateProfile,
  updatePassword,
  getApartment,
  fetchResident,
};
