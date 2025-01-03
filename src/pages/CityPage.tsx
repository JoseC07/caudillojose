import { useParams } from 'react-router-dom'

export default function CityPage() {
  const { cityName } = useParams<{ cityName: string }>()

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex items-center justify-center">
      <h1>Welcome to {cityName}</h1>
      {/* Add more details or components specific to the city */}
    </div>
  )
} 