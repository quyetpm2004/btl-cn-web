import * as collectionPeriodService from '@/services/admin/collectionPeriod.service'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function createCollectionPeriod(req, res) {
  try {
    const collectionPeriodData = req.body
    const collectionPeriod =
      await collectionPeriodService.create(collectionPeriodData)
    return res.status(StatusCodes.CREATED).json({ collectionPeriod })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllCollectionPeriods(req, res) {
  try {
    const collectionPeriods = await collectionPeriodService.getAll()
    return res.status(StatusCodes.OK).json({ collectionPeriods })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateCollectionPeriod(req, res) {
  try {
    const collectionPeriodId = req.params.id
    const collectionPeriodData = req.body
    const updatedCollectionPeriod = await collectionPeriodService.update(
      collectionPeriodId,
      collectionPeriodData
    )
    return res
      .status(StatusCodes.OK)
      .json({ collectionPeriod: updatedCollectionPeriod })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function closeCollectionPeriod(req, res) {
  try {
    const collectionPeriodId = req.params.id
    await collectionPeriodService.close(collectionPeriodId)
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Đóng đợt thu thành công' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteCollectionPeriod(req, res) {
  try {
    const collectionPeriodId = req.params.id
    await collectionPeriodService.deleteCollectionPeriod(collectionPeriodId)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export {
  createCollectionPeriod,
  getAllCollectionPeriods,
  updateCollectionPeriod,
  closeCollectionPeriod,
  deleteCollectionPeriod
}
