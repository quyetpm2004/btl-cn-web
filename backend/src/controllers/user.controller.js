import { handleCreateUser, handleGetAllUsers } from "../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await handleGetAllUsers();
    return res.status(200).json({
      success: true,
      message: "Lấy danh sách người dùng thành công",
      data: users,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ nội bộ",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const newUser = await handleCreateUser(email, username, password, role);

    return res.status(201).json({
      success: true,
      message: "Tạo người dùng mới thành công",
      data: newUser,
    });
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể tạo người dùng",
      error: error.message,
    });
  }
};

export { getAllUsers, createUser };
