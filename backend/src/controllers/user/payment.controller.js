import { invoiceService } from '../../services/user/invoice.service.js'
import { paymentService } from '../../services/user/payment.service.js'
import { getResidentByUserId } from '../../repositories/resident.repository.js'
import {
  getInvoiceById,
  updateInvoice
} from '../../repositories/invoice.repository.js'
import { createPaymentRepo } from '../../repositories/payment.repository.js'
import moment from 'moment'

const getPaymentUnpaid = async (req, res) => {
  try {
    const { id } = req.user
    console.log('id', id)
    const invoices = await invoiceService.getUnpaidInvoicesForUser(id)
    return res
      .status(200)
      .json({ message: 'Unpaid invoices fetched', data: invoices })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const getPaymentPaid = async (req, res) => {
  try {
    const userId = req.user?.id
    const invoices = await invoiceService.getPaidInvoicesForUser(userId)
    return res
      .status(200)
      .json({ message: 'Paid invoices fetched', data: invoices })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const createPayment = async (req, res) => {
  try {
    const { invoiceId } = req.body

    const paymentUrl = await paymentService.createPayment(invoiceId, req.ip)

    return res.status(200).json({ data: paymentUrl })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const vnpayReturn = async (req, res) => {
  try {
    const verify = await paymentService.verifyPayment(req.query)

    if (!verify.isVerified) {
      return res.send('Checksum invalid!')
    }

    const { id } = req.user
    const resident = await getResidentByUserId(id)
    const residentId = resident.id

    const invoiceId = req.query.vnp_TxnRef.split('_')[1]

    if (verify.vnp_ResponseCode === '00') {
      console.log('Thanh toán thành công')
      const invoice = await getInvoiceById(invoiceId)
      if (invoice.status !== 1) {
        await updateInvoice(invoiceId, {
          status: 1,
          paid_at: moment(verify.vnp_PayDate, 'YYYYMMDDHHmmss').format(
            'YYYY-MM-DD HH:mm:ss'
          )
        })

        await createPaymentRepo({
          invoice_id: invoiceId,
          resident_id: residentId,
          method: 'credit_card',
          amount: verify.vnp_Amount,
          paid_at: moment(verify.vnp_PayDate, 'YYYYMMDDHHmmss').format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          transaction_code: verify.vnp_TransactionNo
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Thanh toán thành công',
        amount: verify.vnp_Amount,
        paymentMethod: verify.vnp_BankCode,
        paymentDate: verify.vnp_PayDate
      })
    } else {
      return res.status(200).json({
        success: false,
        message: 'Thanh toán thất bại'
      })
    }
  } catch (err) {
    console.log('err xay ra la', err)
    res.send('Lỗi xử lý thanh toán')
  }
}

export { getPaymentUnpaid, getPaymentPaid, createPayment, vnpayReturn }
