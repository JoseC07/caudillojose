// 'use client'

// import { useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { Sphere, OrbitControls } from '@react-three/drei'
// import * as THREE from 'three'

// // Content Section Component
// function ContentSection({ currentSection, sectionIndex }: { currentSection: number, sectionIndex: number }) {
//   if (currentSection !== sectionIndex) return null

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Section {sectionIndex + 1}</h2>
//       <p>Content for section {sectionIndex + 1} goes here.</p>
//     </div>
//   )
// }

// // Navigation Buttons Component
// function NavigationButtons({ handleNextCity, handlePreviousCity }: { handleNextCity: () => void, handlePreviousCity: () => void }) {
//   return (
//     <div className="absolute bottom-4 right-4 flex space-x-2">
//       <button onClick={handlePreviousCity} className="px-4 py-2 bg-blue-500 text-white rounded">
//         Previous
//       </button>
//       <button onClick={handleNextCity} className="px-4 py-2 bg-blue-500 text-white rounded">
//         Next
//       </button>
//     </div>
//   )
// }

// // Globe Component
// function Globe({ selectedCityIndex }: { selectedCityIndex: number }) {
//   const cities = [
//     { name: 'New York', lat: 40.7128, lon: -74.0060 },
//     { name: 'London', lat: 51.5074, lon: -0.1278 },
//     { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
//     { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
//   ]

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Sphere args={[1, 64, 64]}>
//         <meshStandardMaterial color="#1E40AF" />
//       </Sphere>
//       {cities.map((city, index) => {
//         const phi = (90 - city.lat) * (Math.PI / 180)
//         const theta = (city.lon + 180) * (Math.PI / 180)
//         const x = -(Math.sin(phi) * Math.cos(theta))
//         const z = Math.sin(phi) * Math.sin(theta)
//         const y = Math.cos(phi)
//         return (
//           <mesh key={city.name} position={[x, y, z]} scale={selectedCityIndex === index ? 0.05 : 0.03}>
//             <sphereGeometry args={[1, 32, 32]} />
//             <meshStandardMaterial color={selectedCityIndex === index ? "#FCD34D" : "#EF4444"} />
//           </mesh>
//         )
//       })}
//       <OrbitControls enableZoom={false} enablePan={false} />
//     </>
//   )
// }

// // Main Component
// export default function Home() {
//   const [currentSection, setCurrentSection] = useState(0)

//   const handleNextSection = () => {
//     setCurrentSection((prev) => (prev + 1) % 4)
//   }

//   const handlePreviousSection = () => {
//     setCurrentSection((prev) => (prev === 0 ? 3 : prev - 1))
//   }

//   return (
//     <div className="fixed inset-0 grid grid-cols-2 grid-rows-2">
//       <div className="bg-gray-100">
//         <ContentSection currentSection={currentSection} sectionIndex={0} />
//       </div>
//       <div className="bg-gray-200">
//         <ContentSection currentSection={currentSection} sectionIndex={1} />
//       </div>
//       <div className="bg-gray-300">
//         <ContentSection currentSection={currentSection} sectionIndex={2} />
//       </div>
//       <div className="relative bg-gray-400">
//         <Canvas
//           camera={{ position: [0, 0, 5] }}
//           style={{ width: '100%', height: '100%', background: 'transparent' }}
//         >
//           <Globe selectedCityIndex={currentSection} />
//         </Canvas>
//         <NavigationButtons
//           handleNextCity={handleNextSection}
//           handlePreviousCity={handlePreviousSection}
//         />
//       </div>
//     </div>
//   )
// }