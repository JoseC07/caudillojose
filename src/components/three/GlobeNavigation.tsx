import { Canvas } from '@react-three/fiber'
import Globe from './Globe'
import NavigationButtons from '../NavigationButtons'
import { useState } from 'react'

const cities = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
]

type GlobeNavigationProps = {
  onCityChange?: (cityName: string) => void;
}

export default function GlobeNavigation({ onCityChange }: GlobeNavigationProps) {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0)

  const handleNextCity = () => {
    const nextIndex = (selectedCityIndex + 1) % 4
    setSelectedCityIndex(nextIndex)
    onCityChange?.(cities[nextIndex].name)
  }

  const handlePreviousCity = () => {
    const prevIndex = selectedCityIndex === 0 ? 3 : selectedCityIndex - 1
    setSelectedCityIndex(prevIndex)
    onCityChange?.(cities[prevIndex].name)
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Globe selectedCityIndex={selectedCityIndex} />
      </Canvas>
      <div className="pointer-events-auto">
        <NavigationButtons
          handleNextCity={handleNextCity}
          handlePreviousCity={handlePreviousCity}
        />
      </div>
    </div>
  )
} 