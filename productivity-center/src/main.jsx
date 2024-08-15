// Import React 
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import React Components
import App from './App.jsx'

//Initialize localStorage
if(!localStorage.getItem("habitList")){
  localStorage.setItem("habitList",JSON.stringify([]))
}

if(!localStorage.getItem("goalList")){
  localStorage.setItem("goalList",JSON.stringify([]))
} 

//Render Application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
