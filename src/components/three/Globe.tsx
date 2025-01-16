import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh } from 'three'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import useWindowSize from '../../hooks/useWindowSize'

type GlobeProps = {
  selectedCityIndex: number;
};

const cities = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
] as const

export default function Globe({ selectedCityIndex }: GlobeProps) {
  const meshRef = useRef<Mesh>(null!)
  const { camera } = useThree()
  const { width } = useWindowSize()
  const globeScale = width < 768 ? 0.8 : 1

  const latLonToVector3 = (lat: number, lon: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const radius = 1.01

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    )
  }

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.2
    const selectedCity = cities[selectedCityIndex]
    const cityPosition = latLonToVector3(selectedCity.lat, selectedCity.lon)
    camera.position.lerp(cityPosition.multiplyScalar(2), 0.05)
    camera.lookAt(0, 0, 0)
  })

  // Create curves between cities
  const curves = useMemo(() => {
    const result: THREE.QuadraticBezierCurve3[] = []
    
    for (let i = 0; i < cities.length - 1; i++) {
      const startCity = cities[i]
      const endCity = cities[i + 1]
      
      const startPos = latLonToVector3(startCity.lat, startCity.lon)
      const endPos = latLonToVector3(endCity.lat, endCity.lon)
      
      // Calculate a control point above the surface
      const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5)
      const distance = startPos.distanceTo(endPos)
      midPoint.normalize().multiplyScalar(1 + distance * 0.5)
      
      const curve = new THREE.QuadraticBezierCurve3(
        startPos,
        midPoint,
        endPos
      )
      
      result.push(curve)
    }
    return result
  }, [])

  // Create points for the curve lines
  const curvePoints = useMemo(() => 
    curves.map(curve => new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)))
  , [curves])

  // Memoize the arrows configuration to prevent recreating on every render
  const arrowsConfig = useMemo(() => 
    curves.map((curve, index) => ({
      curve,
      index,
      // You could add more static configuration here if needed
      speed: 0.2,
      baseScale: 0.8,
      scaleVariation: 0.2
    }))
  , [curves]) // Only recreate if curves change

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <group scale={[globeScale, globeScale, globeScale]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial color="#808080" wireframe={true} />
        </mesh>

        {/* Draw the curves */}
        {curvePoints.map((geometry, idx) => (
          <line key={`curve-${idx}`} geometry={geometry}>
            <lineBasicMaterial color="skyblue" opacity={0.3} transparent={true} />
          </line>
        ))}

        {/* Optimized arrows rendering */}
        {arrowsConfig.map(config => (
          <MovingArrow 
            key={`arrow-${config.index}`} 
            {...config}
          />
        ))}

        {/* Existing city markers */}
        {cities.map((city) => {
          const position = latLonToVector3(city.lat, city.lon)
          return (
            <group key={city.name} position={position.toArray()}>
              <Sphere args={[0.02, 16, 16]}>
                <meshBasicMaterial color="red" />
              </Sphere>
              <Html distanceFactor={10}>
                <div style={{ color: 'white', fontSize: '12px' }}>{city.name}</div>
              </Html>
            </group>
          )
        })}
      </group>

      <OrbitControls enableZoom={false} />
    </>
  )
}

// Optimized MovingArrow component
function MovingArrow({
  curve,
  index,
  speed = 0.2,
  baseScale = 0.8,
  scaleVariation = 0.2
}: {
  curve: THREE.QuadraticBezierCurve3
  index: number
  speed?: number
  baseScale?: number
  scaleVariation?: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  
  // Memoize the arrow material to prevent recreation
  const material = useMemo(() => 
    new THREE.MeshBasicMaterial({ 
      color: 'skyblue', 
      opacity: 0.6, 
      transparent: true 
    })
  , [])

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * speed) % 1
    const arrowPosition = curve.getPoint(t)
    const arrowDirection = curve.getTangent(t).normalize()
    const arrowQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      arrowDirection
    )

    if (ref.current) {
      ref.current.position.copy(arrowPosition)
      ref.current.quaternion.copy(arrowQuaternion)
      const scaleFactor = baseScale + scaleVariation * Math.sin(t * Math.PI * 2 + index)
      ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor)
    }
  })

  return (
    <mesh ref={ref}>
      <coneGeometry args={[0.01, 0.025, 8]} />
      {/* Use memoized material */}
      <primitive object={material} />
    </mesh>
  )
} 