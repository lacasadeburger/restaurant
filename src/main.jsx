import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css' // Ton fichier principal qui contient maintenant tout le design

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
