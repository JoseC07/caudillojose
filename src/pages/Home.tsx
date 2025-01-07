import { useState } from 'react'
import GlobeNavigation from '../components/three/GlobeNavigation'
import CityContent from '../components/CityContent'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  const [currentCity, setCurrentCity] = useState('New York')

  return (
    <>
      <Helmet>
        <title>Home | About Me</title>
        <meta
          name="description"
          content="Welcome to my interactive portfolio homepage, featuring a 3D globe navigation."
        />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden">
        {/* Background Content Layer */}
        <div className="relative z-0">
          <CityContent cityName={currentCity} />
        </div>

        {/* Globe Layer */}
        <div className="relative z-10">
          <GlobeNavigation onCityChange={setCurrentCity} />
        </div>
      </main>
    </>
  )
} 