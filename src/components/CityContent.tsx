type CityContentProps = {
  cityName: string;
}

export default function CityContent({ cityName }: CityContentProps) {
  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10">
      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
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