import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function CityPage() {
  const { cityName } = useParams<{ cityName: string }>()

  return (
    <>
      <Helmet>
        <title>{cityName} | My Portfolio</title>
        <meta
          name="description"
          content={`Welcome to ${cityName}! Learn more about my projects, experience, and how to contact me.`}
        />
      </Helmet>

      <div className="h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <h1>Welcome to {cityName}</h1>
        {/* Add more details or components specific to the city */}
      </div>
    </>
  )
} 