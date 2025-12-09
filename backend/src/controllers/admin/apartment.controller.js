import { apartmentService } from '@/services/admin/apartment.service.js'
import { residentApartmentService } from '@/services/admin/residentApartment.service.js'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createApartment(req, res) {
  try {
    const apartmentData = req.body
    const newApartment =
      await apartmentService.createApartmentService(apartmentData)
    return res.status(StatusCodes.CREATED).json({ apartment: newApartment })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getApartmentDetail(req, res) {
  try {
    const apartmentId = req.params.id
    const apartment =
      await apartmentService.getApartmentDetailService(apartmentId)
    return res.status(StatusCodes.OK).json({ apartment })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateApartment(req, res) {
  try {
    const apartmentId = req.params.id
    const apartmentData = req.body
    const updatedApartment = await apartmentService.updateApartmentService(
      apartmentId,
      apartmentData
    )
    return res.status(StatusCodes.OK).json({ apartment: updatedApartment })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function filterApartments(req, res) {
  try {
    const filters = req.query
    const result = await apartmentService.filterApartmentsService(filters)
    return res.status(StatusCodes.OK).json(result)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getApartmentsWithServices(req, res) {
  try {
    const filters = req.query
    const result =
      await apartmentService.getApartmentsWithServicesService(filters)
    return res.status(StatusCodes.OK).json(result)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteApartment(req, res) {
  try {
    const apartmentId = req.params.id
    await apartmentService.deleteApartmentService(apartmentId)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getApartmentCount(req, res) {
  try {
    const apartmentCount = await apartmentService.getApartmentCountService()
    return res.status(StatusCodes.OK).json({ apartmentCount })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getBuildingsApartment(req, res) {
  try {
    const buildings = await apartmentService.getBuildingsApartmentService()
    return res.status(StatusCodes.OK).json({ buildings })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getTypesApartment(req, res) {
  try {
    const types = await apartmentService.getTypesApartmentService()
    return res.status(StatusCodes.OK).json({ types })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function addResident(req, res) {
  try {
    const apartmentId = req.params.id
    const { resident_id } = req.body
    await residentApartmentService.addResidentToApartment(
      resident_id,
      apartmentId
    )
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Resident added successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function removeResident(req, res) {
  try {
    const apartmentId = req.params.id
    const residentId = req.params.residentId
    await residentApartmentService.removeResidentFromApartment(
      residentId,
      apartmentId
    )
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Resident removed successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateServices(req, res) {
  try {
    const apartmentId = req.params.id
    const services = req.body.services // Array of { serviceId }
    await apartmentService.updateApartmentServices(apartmentId, services)
    return res.status(StatusCodes.OK).json({ message: 'Updated successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const apartmentController = {
  createApartment,
  getApartmentDetail,
  updateApartment,
  filterApartments,
  getApartmentsWithServices,
  deleteApartment,
  getApartmentCount,
  getBuildingsApartment,
  getTypesApartment,
  addResident,
  removeResident,
  updateServices
}
