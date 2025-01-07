type CityContentProps = {
  cityName: string;
}

export default function CityContent({ cityName }: CityContentProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-center">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
      
      {/* Content */}
      <div className="relative">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to {cityName}
        </h1>
        <p className="text-xl text-white/80">
          {cityName === 'New York' && "The city that never sleeps"}
          {cityName === 'London' && "Where tradition meets innovation"}
          {cityName === 'Tokyo' && "A blend of modern and traditional"}
          {cityName === 'Mexico City' && "Rich in culture and history"}
        </p>
      </div>
    </div>
  )
} 