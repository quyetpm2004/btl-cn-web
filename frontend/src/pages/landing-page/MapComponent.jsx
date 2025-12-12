import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

// Style cho container của bản đồ
const containerStyle = {
  width: '100%',
  height: '100%', // Để bản đồ lấp đầy container
  borderRadius: '0.5rem' // Bo góc cho đẹp
}

// Tọa độ của "HH1C Linh Đàm, Hoàng Mai, Hà Nội"
const center = {
  lat: 20.9647395,
  lng: 105.8261128
}

const MapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    // ⚠️ QUAN TRỌNG: Thay API Key của bạn vào đây
    googleMapsApiKey: 'YOUR_API_KEY_HERE'
  })

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16} // Phóng to hơn một chút để thấy rõ
      options={{
        // Ẩn các nút điều khiển không cần thiết để giao diện sạch hơn
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}>
      {/* Đặt một điểm đánh dấu tại vị trí trung tâm */}
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  )
}

export default React.memo(MapComponent)
