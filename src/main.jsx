import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css' // <--- Très important si tes styles ne sont pas déjà dans App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
