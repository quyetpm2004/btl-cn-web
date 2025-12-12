import express from 'express'
import * as periodController from '@/controllers/admin/collectionPeriod.controller'
import { validateBody, validateParams } from '@/middlewares/validate.js'
import {
  createCollectionPeriodSchema,
  updateCollectionPeriodSchema,
  collectionPeriodIdParamSchema
} from '@/schemas/collectionPeriod.schema'

const collectionPeriodRouter = express.Router()

collectionPeriodRouter.post(
  '/',
  validateBody(createCollectionPeriodSchema),
  periodController.createCollectionPeriod
)
collectionPeriodRouter.get('/', periodController.getAllCollectionPeriods)
collectionPeriodRouter.put(
  '/:id',
  validateParams(collectionPeriodIdParamSchema),
  validateBody(updateCollectionPeriodSchema),
  periodController.updateCollectionPeriod
)
collectionPeriodRouter.delete(
  '/:id',
  validateParams(collectionPeriodIdParamSchema),
  periodController.deleteCollectionPeriod
)
collectionPeriodRouter.put(
  '/:id/close',
  validateParams(collectionPeriodIdParamSchema),
  periodController.closeCollectionPeriod
)

export default collectionPeriodRouter
