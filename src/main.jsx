import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index_v2.css'
import VECTApp from './App.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VECTApp />
  </StrictMode>,
)
