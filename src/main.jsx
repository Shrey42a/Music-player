import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import tracks from './tracks'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tracks={tracks} />
  </React.StrictMode>,
)
