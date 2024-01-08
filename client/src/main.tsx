import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { ProfileDataProvider } from './providers/ProfileDataProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfileDataProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProfileDataProvider>
  </React.StrictMode>,
)
