import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'


import "./styles/index.css"
import "./styles/droppable.css"
import "./styles/draggable.css"
import "./styles/variaveis.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
