import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import './App.css'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  return (
    <div className="bg-red-500">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
