import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import WorkoutApp from './WorkoutApp.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutApp />
  </StrictMode>,
)
