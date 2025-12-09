import * as serviceService from '@/services/admin/service.service.js'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createService(req, res) {
  try {
    const serviceData = req.body
    const service = await serviceService.create(serviceData)
    return res.status(StatusCodes.CREATED).json({ service })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllActiveServices(req, res) {
  try {
    const services = await serviceService.getAllActive()
    return res.status(StatusCodes.OK).json({ services })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateService(req, res) {
  try {
    const serviceId = req.params.id
    const serviceData = req.body
    const updatedService = await serviceService.update(serviceId, serviceData)
    return res.status(StatusCodes.OK).json({ service: updatedService })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteService(req, res) {
  try {
    const serviceId = req.params.id
    await serviceService.deleteService(serviceId)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export { createService, getAllActiveServices, updateService, deleteService }
