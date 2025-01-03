import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import CityPage from '../../pages/CityPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/city/:cityName" element={<CityPage />} />
      </Routes>
    </Router>
  )
}

export default App 