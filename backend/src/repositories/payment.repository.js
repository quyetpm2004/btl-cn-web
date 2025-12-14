import { Payment } from '../models/index.js'


async function createPaymentRepo(data, options = {}) {
  return Payment.create(data, options)
}

export {
    createPaymentRepo
}