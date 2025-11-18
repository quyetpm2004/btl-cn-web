import pkg from "../models/index.js";
const { User, Resident } = pkg;

async function createUser(userData, options = {}) {
  return User.create(userData, options);
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function getAllUsers() {
  return User.findAll();
}

async function getUserByUsername(username) {
  return User.findOne({ where: { username } });
}

async function getUserByEmail(email) {
  return User.findOne({ where: { email } });
}

async function updateUser(userId, updateData) {
  return User.update(updateData, { where: { id: userId } });
}

async function deleteUser(userId) {
  return User.destroy({ where: { id: userId } });
}

async function getUserWithResident(userId) {
  return User.findOne({
    where: { id: userId },
    include: [{ model: Resident, as: "resident" }],
    attributes: { exclude: ["password"] },
  });
}

async function updateUserWithResident(userId, data) {
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
    avatar,
  } = data;

  await User.update(
    { email, phone, avatar_url: avatar },
    { where: { id: userId } }
  );

  await Resident.update(
    {
      id_card,
      dob,
      full_name,
      gender,
      hometown,
      ethnicity,
      occupation,
    },
    { where: { user_id: userId } }
  );

  return await User.findOne({
    where: { id: userId },
    include: [{ model: Resident, as: "resident" }],
    attributes: { exclude: ["password"] },
  });
}

export {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserWithResident,
  updateUserWithResident,
};
