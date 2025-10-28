import { apartmentService } from '../services/apartment.service.js'
import { toHttpError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createApartment(req, res) {
  try {
    const apartmentData = req.body
    const newApartment = await apartmentService.createApartmentService(
      apartmentData
    )
    return res.status(StatusCodes.CREATED).json({ apartment: newApartment })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getApartments(req, res) {
  try {
    const apartments = await apartmentService.getApartmentsService()
    return res.status(StatusCodes.OK).json({ apartments })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getApartmentDetail(req, res) {
  try {
    const apartmentId = req.params.id
    const apartment = await apartmentService.getApartmentDetailService(
      apartmentId
    )
    if (!apartment)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Apartment not found' })
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
    if (!updatedApartment)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Apartment not found' })
    return res.status(StatusCodes.OK).json({ apartment: updatedApartment })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function filterApartments(req, res) {
  try {
    const filters = req.query
    const apartments = await apartmentService.filterApartmentsService(filters)
    return res.status(StatusCodes.OK).json({ apartments })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteApartment(req, res) {
  try {
    const apartmentId = req.params.id
    const deleted = await apartmentService.deleteApartmentService(apartmentId)
    if (!deleted)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Apartment not found' })
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const apartmentController = {
  createApartment,
  getApartments,
  getApartmentDetail,
  updateApartment,
  filterApartments,
  deleteApartment
}
