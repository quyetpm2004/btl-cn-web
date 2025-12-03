import { Invoice } from "../../models/index.js";
import moment from 'moment'
import vnpay from '../../config/vnpay.config.js'

  async function createPayment(invoiceId, ipAddress) {
    const invoice = await Invoice.findByPk(+invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    const orderId = `${moment().format("YYYYMMDDHHmmss")}_${invoiceId}`;

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: invoice.total_amount,
      vnp_IpAddr: ipAddress,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán hóa đơn #${invoiceId}`,
      vnp_ReturnUrl: process.env.VNP_RETURN_URL,
      vnp_Locale: "vn",
      vnp_OrderType: "billpayment",
    });

    // Đường link dẫn đến trang vnpay để thanh toán
    return paymentUrl;
  }

  async function verifyPayment(query) {
    return vnpay.verifyReturnUrl(query);
  }

  export const paymentService = { createPayment, verifyPayment }


