import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import './App.css'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import Login from './components/Login'

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/landing" element={<LandingPage />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
