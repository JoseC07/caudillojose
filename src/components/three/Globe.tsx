import  { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh } from 'three'
import { OrbitControls, Sphere, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import useWindowSize from '../../hooks/useWindowSize'

type GlobeProps = {
  selectedCityIndex: number;
};

export default function Globe({ selectedCityIndex }: GlobeProps) {
  const meshRef = useRef<Mesh>(null!)
  const { camera } = useThree()

  const { width } = useWindowSize()
  const globeScale = width < 768 ? 0.8 : 1
  const fontSize = width < 768 ? '8px' : '12px'

  const cities = [
    { name: 'New York', lat: 40.7128, lon: -74.006 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  ]

  const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)

    const x = -radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    return new THREE.Vector3(x, y, z)
  }

  const arcs: {
    curve: THREE.QuadraticBezierCurve3
    points: THREE.Vector3[]
  }[] = []
  for (let i = 0; i < cities.length - 1; i++) {
    const cityA = cities[i]
    const cityB = cities[i + 1]
    const start = latLonToVector3(cityA.lat, cityA.lon, 1.01)
    const end = latLonToVector3(cityB.lat, cityB.lon, 1.01)
    const mid = start.clone().add(end).normalize().multiplyScalar(1.5)
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const points = curve.getPoints(50)
    arcs.push({ curve, points })
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
    const selectedCity = cities[selectedCityIndex]
    const cityPosition = latLonToVector3(selectedCity.lat, selectedCity.lon, 1.01)
    const cameraTarget = cityPosition.clone().multiplyScalar(2)
    camera.position.lerp(cameraTarget, 0.05)
    camera.lookAt(0, 0, 0)
  })

  const handleCityClick = (cityName: string) => {
    console.log('City clicked:', cityName)
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <group scale={[globeScale, globeScale, globeScale]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial color="#808080" shininess={5} wireframe={true} />
        </mesh>

        {cities.map((city, index) => {
          const position = latLonToVector3(city.lat, city.lon, 1.01)
          return (
            <group key={city.name} position={position.toArray()}>
              <Sphere
                args={[0.02, 16, 16]}
                onClick={() => handleCityClick(city.name)}
              >
                <meshBasicMaterial color="red" />
              </Sphere>
              <Html distanceFactor={10}>
                <div style={{ 
                  color: 'black', 
                  fontSize: fontSize,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}>
                  {city.name}
                </div>
              </Html>
            </group>
          )
        })}

        {arcs.map((arc, index) => (
          <group key={`arc-${index}`}>
            <Line points={arc.points} color="white" lineWidth={1} dashed={false} />
            <MovingArrow curve={arc.curve} index={index} />
          </group>
        ))}
      </group>

      <OrbitControls enableZoom />
    </>
  )
}

function MovingArrow({
  curve,
  index,
}: {
  curve: THREE.QuadraticBezierCurve3
  index: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * 0.2) % 1
    const arrowPosition = curve.getPoint(t)
    const arrowDirection = curve.getTangent(t).normalize()
    const arrowQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      arrowDirection
    )

    if (ref.current) {
      ref.current.position.copy(arrowPosition)
      ref.current.quaternion.copy(arrowQuaternion)
      const scaleFactor = 0.8 + 0.2 * Math.sin(t * Math.PI * 2 + index)
      ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor)
    }
  })

  return (
    <mesh ref={ref}>
      <coneGeometry args={[0.01, 0.025, 8]} />
      <meshBasicMaterial color="skyblue" opacity={0.6} transparent={true} />
    </mesh>
  )
} 