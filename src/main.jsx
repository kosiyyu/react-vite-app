import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import "../node_modules/@picocss/pico/css/pico.classless.css"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
