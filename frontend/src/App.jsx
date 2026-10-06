import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router'
import GoogleLogin from './components/GoogleLogin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
