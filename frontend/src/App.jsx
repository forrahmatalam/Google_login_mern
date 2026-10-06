import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router'
import Dashboard from './components/Dashboard'
import GoogleLogin from './components/GoogleLogin'
import NotFound from './components/NotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId="917873438070-dp91mae1ncaebu7na7qhl1g2oj06qv3t.apps.googleusercontent.com">
              <GoogleLogin />
            </GoogleOAuthProvider>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
