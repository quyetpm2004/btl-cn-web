import { VNPay } from 'vnpay/vnpay';

const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMNCODE,
  secureSecret: process.env.VNP_HASHSECRET,
  vnpayHost: process.env.VNP_URL || "https://sandbox.vnpayment.vn",
  testMode: true, // false khi lên production
  hashAlgorithm: 'SHA512', // Thuật toán mã hóa
});

module.exports = vnpay;
