import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
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
