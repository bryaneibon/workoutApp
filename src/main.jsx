import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import KaizenForge from './App.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KaizenForge />
  </StrictMode>,
)
