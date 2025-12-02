import { invoiceService } from '../../services/invoice.service.js'
import { paymentService } from '../../services/user/payment.service.js';
import {Invoice} from "../../models";

const getPaymentUnpaid = async (req, res) => {
  try {
    const { id } = req.user;
    const invoices = await invoiceService.getUnpaidInvoicesForUser(id)
    return res.status(200).json({ message: 'Unpaid invoices fetched', data: invoices })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const getPaymentPaid = async (req, res) => {
  try {
    const userId = req.user?.id
    const invoices = await invoiceService.getPaidInvoicesForUser(userId)
    return res.status(200).json({ message: 'Paid invoices fetched', data: invoices })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const createPayment = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    const paymentUrl = await paymentService.createPayment(invoiceId, req.ip);

    res.json({ paymentUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const vnpayReturn = async (req, res) => {
  try {
    const verify = await paymentService.verifyPayment(req.query);

    console.log("VNPay return data:", req.query, "Verification result:", verify);

    if (!verify.isVerified) {
      return res.send("Checksum invalid!");
    }

    const invoiceId = req.query.vnp_TxnRef.split("_")[1];

    if (verify.vnp_ResponseCode === "00") {
      // update invoice and create payment 
      await Invoice.update(
        { status: 1 }, // PAID
        { where: { id: invoiceId } }
      );

      return res.send("Thanh toán thành công!");
    } else {
      return res.send("Thanh toán thất bại!");
    }
  } catch (err) {
    console.log(err);
    res.send("Lỗi xử lý thanh toán");
  }
};

export { getPaymentUnpaid, getPaymentPaid, createPayment, vnpayReturn }
