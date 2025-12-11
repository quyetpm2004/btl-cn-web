import { serviceService } from '@/services/service.service.js'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createService(req, res) {
  try {
    const serviceData = req.body
    const newService = await serviceService.createServiceService(serviceData)
    return res.status(StatusCodes.CREATED).json({ service: newService })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getServices(req, res) {
  try {
    const services = await serviceService.getServicesService()
    return res.status(StatusCodes.OK).json({ services })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getServiceDetail(req, res) {
  try {
    const serviceId = req.params.id
    const service = await serviceService.getServiceDetailService(serviceId)
    return res.status(StatusCodes.OK).json({ service })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateService(req, res) {
  try {
    const serviceId = req.params.id
    const serviceData = req.body
    const updatedService = await serviceService.updateServiceService(
      serviceId,
      serviceData
    )
    return res.status(StatusCodes.OK).json({ service: updatedService })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function filterServices(req, res) {
  try {
    const filters = req.query
    const services = await serviceService.filterServicesService(filters)
    return res.status(StatusCodes.OK).json({ services })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteService(req, res) {
  try {
    const serviceId = req.params.id
    await serviceService.deleteServiceService(serviceId)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const serviceController = {
  createService,
  getServices,
  getServiceDetail,
  updateService,
  filterServices,
  deleteService
}
