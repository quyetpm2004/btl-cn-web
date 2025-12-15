import { Card } from '@/components/ui/card'
import { CircleCheckIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { paymentResultApi } from '@/services/api'
import moment from 'moment'

const PaymentResult = () => {
  const location = useLocation()
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Chuyển query string thành object
        const res = await paymentResultApi(location.search)

        if (res?.data) {
          setResult(res.data)

          // Ẩn query khỏi URL mà không reload trang
        }
      } catch (error) {
        console.error('Payment result error:', error)
      }
    }

    fetchResult()
  }, [location.search])

  if (!result) return <div>Đang kiểm tra thanh toán...</div>

  return (
    <>
      {result.success ? (
        <div className="mt-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="flex flex-col items-center">
              <CircleCheckIcon className="h-16 w-16 text-green-500" />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
                Thanh toán thành công
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Cảm ơn bạn đã thanh toán. Hóa đơn của bạn đã được ghi nhận.
              </p>
            </div>
            <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Số tiền đã trả:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {result.amount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }) ?? '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Phương thức thanh toán:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  Ngân hàng {result.paymentMethod || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Ngày & Thời gian:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {result.paymentDate
                    ? moment(result.paymentDate, 'YYYYMMDDHHmmss').format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : '-'}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                to={'/user/payment'}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300">
                Quay lại
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="flex flex-col items-center">
              <CircleCheckIcon className="h-16 w-16 text-red-500" />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
                Thanh toán thất bại
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Rất tiếc bạn thanh toán không thành công. Hãy thử lại!
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                to={'/user/payment'}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300">
                Quay lại
              </Link>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default PaymentResult
