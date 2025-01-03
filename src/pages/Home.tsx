'use client'

import { Canvas } from '@react-three/fiber'
import Globe from '../components/three/Globe'
import NavigationButtons from '../components/NavigationButtons'
import { useState } from 'react'

export default function Home() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0)

  const handleNextCity = () => {
    setSelectedCityIndex((prev) => (prev + 1) % 4)
  }
  const handlePreviousCity = () => {
    setSelectedCityIndex((prev) => (prev === 0 ? 3 : prev - 1))
  }

  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: '100vw', height: '100vh', background: 'black' }}
      >
        <Globe selectedCityIndex={selectedCityIndex} />
      </Canvas>
      <NavigationButtons
        handleNextCity={handleNextCity}
        handlePreviousCity={handlePreviousCity}
      />
    </div>
  )
} 