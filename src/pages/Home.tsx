'use client'

import { useState } from 'react'
import GlobeNavigation from '../components/three/GlobeNavigation'
import CityContent from '../components/CityContent'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  const [currentCity, setCurrentCity] = useState('New York') // Default city

  return (
    <>
      <Helmet>
        <title>Home | About Me</title>
        <meta
          name="description"
          content="Welcome to my interactive portfolio homepage, featuring a 3D globe navigation."
        />
        {/* You can add more meta tags below, e.g. Open Graph, Twitter Card tags */}
      </Helmet>

      <main className="relative min-h-screen">
        <GlobeNavigation onCityChange={setCurrentCity} />
        <CityContent cityName={currentCity} />
      </main>
    </>
  )
} 