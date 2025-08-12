import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import VectApp from './App.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VectApp />
  </StrictMode>,
)
