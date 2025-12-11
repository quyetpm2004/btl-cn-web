import { getApartmentByUserId } from '../../repositories/apartment.repository'
import { getResidentApartmentByResidentId } from '../../repositories/residentApartment.repository'
import { AppError } from '../../utils/errors'
import { User, Apartment, Resident, ApartmentType } from '../../models'
import { includes } from 'zod'
import apartment from '../../models/apartment'
import { StatusCodes } from 'http-status-codes'

const handleGetApartment = async (userId) => {
  const apartment = await getApartmentByUserId(userId)
  const { owner } = apartment
  const residentId = owner.id
  const residentApartment = await getResidentApartmentByResidentId(residentId)

  return { apartment, residentApartment }
}

const handleFetchResident = async (userId) => {
  try {
    if (!userId) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }

    const resident = await Resident.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Apartment,
          as: 'apartments',
          attributes: ['id', 'apartment_code', 'building', 'area', 'floor'],
          include: [
            {
              model: ApartmentType,
              as: 'type'
            }
          ]
        },
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email', 'phone', 'avatar_url']
        }
      ]
    })

    if (!resident) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Resident profile not found')
    }

    const result = {
      fullName: resident.full_name,
      id: resident.id,
      avatar_url: resident.user.avatar_url,
      apartments: resident.apartments.map((a) => ({
        apartmentCode: a.apartment_code,
        floor: a.floor,
        building: a.building,
        relationship: a.ResidentApartment.relationship,
        startDate: a.ResidentApartment.start_date,
        area: a.area,
        name: a.type.name,
        description: a.type.description
      }))
    }

    return result
  } catch (err) {
    throw err
  }
}

export { handleGetApartment, handleFetchResident }
