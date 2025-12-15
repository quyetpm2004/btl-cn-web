import {
  handleGetApartment,
  handleFetchResident
} from '../../services/user/apartment.service'

const getApartment = async (req, res) => {
  const { id } = req.user
  try {
    const data = await handleGetApartment(2)
    return res
      .status(200)
      .json({ message: 'Lấy thông tin căn hộ thành công', data })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const fetchResident = async (req, res) => {
  const { id } = req.user
  try {
    const user = await handleFetchResident(id)
    return res
      .status(200)
      .json({ message: 'Lấy thông tin cư dân thành công', user })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export { getApartment, fetchResident }
