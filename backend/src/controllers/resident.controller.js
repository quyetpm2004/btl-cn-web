import { residentService } from '../services/resident.service.js'
import { toHttpError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createResident(req, res) {
  try {
    const residentData = req.body
    const newResident =
      await residentService.createResidentService(residentData)
    return res.status(StatusCodes.CREATED).json({ resident: newResident })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getResidents(req, res) {
  try {
    const residents = await residentService.getResidentsService()
    return res.status(StatusCodes.OK).json({ residents })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getResidentDetail(req, res) {
  try {
    const residentId = req.params.id
    const resident = await residentService.getResidentDetailService(residentId)
    return res.status(StatusCodes.OK).json({ resident })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateResident(req, res) {
  try {
    const residentId = req.params.id
    const residentData = req.body
    const updatedResident = await residentService.updateResidentService(
      residentId,
      residentData
    )
    return res.status(StatusCodes.OK).json({ resident: updatedResident })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function filterResidents(req, res) {
  try {
    const filters = req.query
    const result = await residentService.filterResidentsService(filters)
    return res.status(StatusCodes.OK).json(result)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteResident(req, res) {
  try {
    const residentId = req.params.id
    await residentService.deleteResidentService(residentId)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getResidentCount(req, res) {
  try {
    const residentCount = await residentService.getResidentCountService()
    return res.status(StatusCodes.OK).json({ residentCount })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const residentController = {
  createResident,
  getResidents,
  getResidentDetail,
  updateResident,
  filterResidents,
  deleteResident,
  getResidentCount
}
